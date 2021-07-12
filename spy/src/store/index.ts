import * as StoreTypings from '@app-common/store';
declare const __dirname: string;
declare const __non_webpack_require__: (path: string) => any;
const globalStorePath =__non_webpack_require__('path').resolve(`${__dirname}../../common/dist/store`);
export const { Store } = __non_webpack_require__(globalStorePath) as typeof StoreTypings;
