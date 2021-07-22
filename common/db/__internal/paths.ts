import { join } from 'path';
import { app } from 'electron';

export const navigationHistoryJson = join(app.getPath('userData'), 'navigation-history.json');
export const dbPath = join(app.getPath('userData'), 'adults.db');

