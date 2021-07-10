export interface ScreenshotModel {
  selector: string;
  pic: string;
  html: string;
}

export interface StoreModel {
  screenshots: ScreenshotModel[]
}
