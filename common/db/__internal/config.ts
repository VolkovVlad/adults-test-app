import { Options } from 'sequelize';
import { dbPath } from './paths';

export const config: Options = {
  dialect: 'sqlite',
  database: 'adults-app',
  storage: dbPath,
  username: null,
  password: null,
  define: { freezeTableName: true },
  query: { raw: false },
  logging: false
}