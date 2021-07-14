import { join } from 'path';
const { app } = require('electron');

export const navigationHistoryJson = join(app.getPath('userData'), 'navigation-history.json');

