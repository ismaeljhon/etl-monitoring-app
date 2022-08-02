import ApiService from './ApiService';

interface ApiServiceConstructorParams {
  prefix?: string;
}

export default abstract class AzureTriggeredWebJobsService<
  Entity
> extends ApiService {
  private prefix?: string;
  constructor(params?: ApiServiceConstructorParams) {
    super({
      baseURL: import.meta.env.VITE_TRIGGERED_WEBJOBS_API_BASE_URL,
      auth: {
        username: import.meta.env.VITE_BASIC_AUTH_USERNAME,
        password: import.meta.env.VITE_BASIC_AUTH_PASSWORD,
      },
    });
    this.prefix = params?.prefix || '';
  }

  async getList(): Promise<Entity[]> {
    return super
      .request({
        url: this.prefix,
      })
      .then((res) => res.data);
  }

  async get(name: string): Promise<Entity> {
    return super
      .request({
        url: name,
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
