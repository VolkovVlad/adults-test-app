import {RequestModel, RequestModelAttributes} from '../models/requests.model';
import { RequestLog } from '../../../state';
import { Queue } from '../../../utils/queue';

export class RequestsController {
  protected constructor(private instance: RequestModel) {
  }

  async saveOne({method, url}: Pick<RequestLog, 'url' | 'method'>): Promise<{ id: number }> {
    const row = await this.instance.create({ method, url });
    return { id: row.getDataValue('id') }
  }

  async patch(source: Omit<RequestModelAttributes, 'id'>, where: { id: number }): Promise<void> {
    await this.instance.update({ ...source }, { where })
  }

  static buildQueuedInstance(instance: RequestModel, queue = new Queue()): RequestsController {
    return Queue.wrapWithQueue(new RequestsController(instance), queue)
  }
}