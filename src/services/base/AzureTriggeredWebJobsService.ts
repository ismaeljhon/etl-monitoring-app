import { WebJobGetListDTO } from '../../interfaces/webjob.interface';
import LocalStorageService from '../LocalStorageService';
import ApiService from './ApiService';

interface ApiServiceConstructorParams {
  prefix?: string;
}

export default abstract class AzureTriggeredWebJobsService<
  Entity
> extends ApiService {
  private prefix?: string;
  private localStorage: InstanceType<typeof LocalStorageService>;
  constructor(params?: ApiServiceConstructorParams) {
    super({
      baseURL: import.meta.env.VITE_TRIGGERED_WEBJOBS_API_BASE_URL,
      auth: {
        username: import.meta.env.VITE_BASIC_AUTH_USERNAME,
        password: import.meta.env.VITE_BASIC_AUTH_PASSWORD,
      },
    });
    this.prefix = params?.prefix || '';
    this.localStorage = new LocalStorageService();
  }

  async getList(opts: WebJobGetListDTO = {}): Promise<Entity[]> {
    /** Fetch data from API only when triggered */
    const { refresh = false } = opts;
    const localStorageWebJobs = this.localStorage.getItem('webjobs');
    let data = JSON.parse(localStorageWebJobs || '[]');

    if (!data || refresh) {
      const { data: resData = [] } = await super.request({
        url: this.prefix,
      });

      /** Save the fetched data to localstorage to be reusable for other services */
      this.localStorage.setItem('webjobs', JSON.stringify(resData));

      data = resData;
    }

    return data;
  }

  async get(name: string): Promise<Entity> {
    return super
      .request({
        url: name,
      })
      .then((res) => res.data);
  }

  async getHistory(name: string) {
    return super
      .request({
        url: `${this.prefix}/${name}/history`,
      })
      .then((res) => res.data);
  }

  async getOutput(url: string) {
    return super
      .request({
        url: url,
      })
      .then((res) => res.data);
  }

  async trigger(name: string) {
    return super
      .request({
        url: `${this.prefix}/${name}/run`,
        method: 'post',
      })
      .then((res) => res.data);
  }
}
