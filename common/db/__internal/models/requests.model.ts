import {
  Sequelize,
  DataTypes,
  Model,
  ModelCtor
} from 'sequelize';

export interface RequestModelInstance {
  id: number,
  requestHeaders: string,
  requestBody: string,
  receivedHeaders: string,
  receivedBody: string,
  method: string,
  url: string,
}

export type RequestModelAttributes = Partial<RequestModelInstance>;

export type RequestModel = ModelCtor<Model<RequestModelInstance, RequestModelAttributes>>;

export default (sequelize: Sequelize): RequestModel => {
  return sequelize.define(
    'RequestsTable',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.NUMBER
      },
      requestHeaders: DataTypes.TEXT,
      requestBody: DataTypes.TEXT,
      receivedHeaders: DataTypes.TEXT,
      receivedBody: DataTypes.TEXT,
      method: DataTypes.TEXT,
      url: DataTypes.TEXT,
    },
  ) as ModelCtor<Model>;
};
