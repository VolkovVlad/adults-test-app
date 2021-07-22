import { Sequelize } from 'sequelize';
import buildRequestsModel from './models/requests.model';
import { config } from './config';
import { RequestsController } from './controllers/requests.controller';
import { Queue } from '../../utils/queue';

const sequelize = new Sequelize(config);

const models = {
  requestsModel: buildRequestsModel(sequelize)
};

const conenctDb = async () => {
  await sequelize.sync({ force: true });
  console.log('========== db init successful ==========');
}

export const registerDb = async (electron) => {
  await conenctDb();
  const queue = new Queue();

  electron.app.Db = {
    requestsStorage: RequestsController.buildQueuedInstance(models.requestsModel, queue)
  }
}
