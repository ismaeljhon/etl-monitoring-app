import { WebJob, WebJobGetListDTO } from '../interfaces/webjob.interface';
import AzureTriggeredWebJobsService from './base/AzureTriggeredWebJobsService';

export default class SyncService extends AzureTriggeredWebJobsService<WebJob> {
  constructor() {
    super();
  }

  async getList(opts: WebJobGetListDTO): Promise<WebJob[]> {
    const { company_code = '' } = opts;
    let res = await super.getList(opts);

    res = res.filter((item) => item?.name.includes('SYNC'));

    if (company_code)
      res = res.filter((item) => item?.name.includes(`${company_code}-SYNC`));

    return res;
  }
}
