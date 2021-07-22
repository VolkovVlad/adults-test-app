import { RequestLog } from '@app-common/state';
import { addRequestLog, patchRequestLog } from '../state-utils';

let itemsCount = 0;

type Interceptor = (input: RequestInfo, init: RequestInit, originalFetch: typeof fetch) => Promise<Response> | Response

export const registerNetworkGrabber = (interceptor?: Interceptor) => {
  const initialFetch = window.fetch;
  window.fetch = async (input: RequestInfo, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : ((input as any).url?.href || input.url);
    const log: RequestLog = await addRequestLog({
      url,
      method: init?.method ?? 'get',
      type: 'fetch',
      state: 'pending',
      send: {
        headers: init?.headers as Record<string, string> || {},
        body: init?.body?.toString() || undefined
      },
      received: {
        headers: {},
        body: undefined
      }
    });

    const response = typeof interceptor === 'function' ?
      await interceptor(input, init!, initialFetch) :
      await initialFetch(input, init);

    log.status = `${response.status}`;
    log.state = 'received';
    response.headers.forEach((val, key) => {
      log.received.headers[key] = val;
    })

    await patchRequestLog(log);

    const initialText = Response.prototype.text;
    const initialJson = Response.prototype.json;
    const initialBlob = Response.prototype.blob;

    response.text = async () => {
      log.received.body = await initialText.apply(response);
      await patchRequestLog(log);
      return log.received.body
    }
    response.json = async () => {
      log.received.body = await initialJson.apply(response);
      await patchRequestLog(log);
      return log.received.body;
    }
    response.blob = async () => {
      log.received.body = url;
      await patchRequestLog(log);
      return await initialBlob.apply(response)
    }

    return response
  }

  (window as any).XMLHttpRequest = class CustomXHR extends XMLHttpRequest {
    log: RequestLog = {
      id: ++itemsCount,
      type: 'xhr',
      url: '',
      method: '',
      state: 'pending',
      send: {
        headers: {},
        body: undefined
      },
      received: {
        headers: {},
        body: undefined
      }
    };

    constructor() {
      super();
    }

    open(method: string, url: string, async?: boolean, name?: string | null, pwd?: string | null) {
      this.log.method = method;
      this.log.url = url;
      return super.open(method, url, async!, name, pwd)
    }

    setRequestHeader(key: string, val: string): void {
      this.log.send.headers[key] = val;
      return super.setRequestHeader(key, val)
    }

    send(body?: Document | BodyInit | null) {
      this.log.send.body = body?.toString() || undefined;
      this.addEventListener('load', async (e) => {
        this.log.received.headers = this.getAllResponseHeaders()
          .split('\r\n')
          .reduce((result, current) => {
            let [name, value] = current.split(': ');
            result[name] = value;
            return result;
          }, {} as RequestLog['received']['headers']);
        this.log.received.body = this.responseText;
        this.log.state = 'received';
        await addRequestLog(this.log);
        await patchRequestLog(this.log);
      }, { once: true })
      return super.send(body)
    }
  }
}
