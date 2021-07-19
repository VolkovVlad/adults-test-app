export interface ScreenshotModel {
  selector: string;
  pic: string;
  html: string;
}

export interface LinkNavigation {
  from: string;
  to: string;
  event: string;
}

export interface RequestLogPayload {
  headers: {[header: string]: string};
  body: string | null | undefined;
}

export interface RequestLog {
  id: string | number;
  url: string;
  type: 'fetch' | 'xhr' | 'other';
  state: 'pending' | 'received' | 'errored';
  method: string;
  status?: string;
  send: RequestLogPayload;
  received : RequestLogPayload;
}

export interface StoreModel {
  screenshots: ScreenshotModel[];
  isScreensGrabCompleted: boolean;
  navigation: LinkNavigation[];
  apiHistory: RequestLog[]
}
