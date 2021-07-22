import { ScreenshotModel, LinkNavigation, RequestLog } from '@app-common/state';
import type { RequestsController } from '@app-common/db';

declare const __non_webpack_require__: (path: string) => any;
const { remote, ipcRenderer } = __non_webpack_require__('electron');
const { app: { AppState, Db }} = remote;

export const { patch, reset, get, select } = AppState;
export const requestStorage: RequestsController = Db.requestsStorage;

export const addScreenshotInState = (screenshot: ScreenshotModel) => {
  const { screenshots } = get()
  patch({ screenshots: [...screenshots, screenshot] });
}

export const addNavigation = (step: LinkNavigation) => {
  const { navigation } = get();
  patch({ navigation: [...navigation, step] });
}

export const getLatestNavigationStep = () => {
  const { navigation } = get();
  return navigation[navigation.length - 1];
}

export const resetAllState = () => AppState.reset();

export const addRequestLog = async (step: Omit<RequestLog, 'id'>) => {
  const { id } = await requestStorage.saveOne(step);
  const res = { id, ...step };

  const { apiHistory } = get();
  patch({ apiHistory: [...apiHistory, res]});

  return res;
}

export const patchRequestLog = (updated: Partial<RequestLog> & Pick<RequestLog, 'id'>) => {
  const state = get() as { apiHistory: RequestLog[] };
  const apiHistory = [...state.apiHistory];
  const index = apiHistory.findIndex(({id}) => id === updated.id);
  const { method, url, id, send, received } = apiHistory[index] = {
    ...apiHistory[index],
    ...updated
  };

  patch({ apiHistory: [...apiHistory] });

  return requestStorage.patch({
    method,
    url,
    requestHeaders: convertToJson(send?.headers),
    requestBody: convertToJson(send?.body),
    receivedBody: convertToJson(received?.body),
    receivedHeaders: convertToJson(received?.headers)
  }, { id } as { id: number })
}

export const openOutside = () => ipcRenderer.send('openClient', true);

export const onOpenInside = (cb: Function) => ipcRenderer.on('closeClient', cb);

export const convertToJson = (source: any) => {
  try {
    return JSON.stringify(source)
  } catch (err) {
    return source?.toString() || ''
  }
}
