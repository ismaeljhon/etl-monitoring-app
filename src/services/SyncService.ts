import { WebJob, WebJobGetListDTO } from '../interfaces/webjob.interface';
import AzureTriggeredWebJobsService from './base/AzureTriggeredWebJobsService';

export default class SyncService extends AzureTriggeredWebJobsService<WebJob> {
  constructor() {
    super();
  }

  async getList(opts: WebJobGetListDTO): Promise<WebJob[]> {
    return super
      .getList(opts)
      .then((res) => res.filter((item) => item?.name.includes('SYNC')));
  }
}
