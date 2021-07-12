import * as StoreTypings from '@app-common/store';
declare const __dirname: string;
const globalStorePath =__non_webpack_require__('path').resolve(`${__dirname}../../../common/dist/store`);
export const { Store, SetScreenshots } = __non_webpack_require__(globalStorePath) as typeof StoreTypings;
