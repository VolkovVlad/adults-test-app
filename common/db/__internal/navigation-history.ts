import { LinkNavigation } from '../../state';
import { navigationHistoryJson } from './paths';
import { writeFileSync, existsSync } from 'fs';

export const read = (): LinkNavigation[] => require(navigationHistoryJson);

export const write = (data: LinkNavigation[]) => writeFileSync(navigationHistoryJson, JSON.stringify(data, null, 4));

export const registerNavigationJson = (electron): void => {
  if (!existsSync(navigationHistoryJson)) {
    write([]);
  }
  electron.app.NavigationHistory = { read, write };
}
