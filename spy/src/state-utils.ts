import { ScreenshotModel, LinkNavigation, RequestLog } from '@app-common/state';

declare const __non_webpack_require__: (path: string) => any;
const { remote, ipcRenderer } = __non_webpack_require__('electron');
const { app: { AppState }} = remote;

export const { patch, reset, get, select } = AppState;

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

export const addRequestLog = (step: RequestLog) => {
  const { apiHistory } = get();
  patch({ apiHistory: [...apiHistory, step] });
}

export const patchRequestLog = (updated: Partial<RequestLog> & Pick<RequestLog, 'id'>) => {
  const state = get() as { apiHistory: RequestLog[] };
  const apiHistory = [...state.apiHistory];
  const index = apiHistory.findIndex(({id}) => id === updated.id);
  apiHistory[index] = {
    ...apiHistory[index],
    ...updated
  }
  patch({ apiHistory: [...apiHistory] });
}

export const openOutside = () => ipcRenderer.send('openClient', true);

export const onOpenInside = (cb: Function) => ipcRenderer.on('closeClient', cb)
