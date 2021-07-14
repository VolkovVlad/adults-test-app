import { ScreenshotModel, LinkNavigation } from '@app-common/state';

declare const __non_webpack_require__: (path: string) => any;
const { remote } = __non_webpack_require__('electron');
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
