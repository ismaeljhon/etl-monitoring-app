import { WebJob } from '../interfaces/webjob.interface';
import AzureTriggeredWebJobsService from './base/AzureTriggeredWebJobsService';

export default class SyncService extends AzureTriggeredWebJobsService<WebJob> {
  constructor() {
    super();
  }

  async getList(): Promise<WebJob[]> {
    return super
      .getList()
      .then((res) => res.filter((item) => item?.name.includes('SYNC')));
  }
}
