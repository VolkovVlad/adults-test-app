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

export interface StoreModel {
  screenshots: ScreenshotModel[];
  isScreensGrabCompleted: boolean;
  navigation: LinkNavigation[];
}
