import LocalStorageService from "../LocalStorageService";
import ApiService from "./ApiService";

interface ApiServiceConstructorParams {
  prefix?: string;
}

interface GetListDTO {
  refresh?: boolean;
}

export default abstract class AzureTriggeredWebJobsService<Entity> extends ApiService {
  private prefix?: string;
  private localStorage: any;
  constructor(params?: ApiServiceConstructorParams) {
    super({
      baseURL: import.meta.env.VITE_TRIGGERED_WEBJOBS_API_BASE_URL,
      auth: {
        username: import.meta.env.VITE_BASIC_AUTH_USERNAME,
        password: import.meta.env.VITE_BASIC_AUTH_PASSWORD,
      },
    });
    this.prefix = params?.prefix || "";
    this.localStorage = new LocalStorageService();
  }

  async getList(opts: GetListDTO = { refresh: false }): Promise<Entity[]> {
    /** comments */
    const { refresh = false } = opts;
    const localStorageWebJobs = this.localStorage.getItem("webjobs");
    if (localStorageWebJobs && !refresh) {
      return JSON.parse(localStorageWebJobs || "[]");
    }
    return super
      .request({
        url: this.prefix,
      })
      .then((res) => {
        const { data = [] } = res;
        this.localStorage.setItem("webjobs", JSON.stringify(data));
        return data;
      });
  }

  async get(name: string): Promise<Entity> {
    return super
      .request({
        url: name,
      })
      .then((res) => res.data);
  }

  async getHistory(name: string): Promise<Entity> {
    return super
      .request({
        url: `${this.prefix}/${name}/history`,
      })
      .then((res) => res.data);
  }

  async trigger(name: string) {
    return super
      .request({
        url: `${this.prefix}/${name}/run`,
        method: "post",
      })
      .then((res) => res.data);
  }
}
