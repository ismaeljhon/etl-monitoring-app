import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface RestApiServiceOptions {
  returnRawData?: boolean;
}

export default class RestApiService {
  axiosInstance: AxiosInstance;

  constructor(prefix: string = "") {
    this.axiosInstance = axios.create({
      baseURL: `${process.env.VUE_APP_URL}/${prefix}`,
    });
  }

  async axiosCall<T>(
    config: AxiosRequestConfig,
    opts: RestApiServiceOptions = {}
  ) {
    try {
      const { returnRawData = false } = opts;
      const res = await this.axiosInstance.request<T>(config);
      return [null, returnRawData ? res : res.data];
    } catch (err) {
      return [err];
    }
  }

  async index(params = {}, opts: RestApiServiceOptions = {}) {
    return this.axiosCall<AxiosResponse>(
      { method: "get", url: "/", params },
      opts
    );
  }

  async get(id: string | number, opts: RestApiServiceOptions = {}) {
    return this.axiosCall<AxiosResponse>(
      { method: "get", url: `/${id}` },
      opts
    );
  }

  async insert(params = {}, opts: RestApiServiceOptions = {}) {
    return this.axiosCall<AxiosResponse>({ method: "post", params }, opts);
  }

  async update(
    params = {},
    id: number | string,
    opts: RestApiServiceOptions = {}
  ) {
    return this.axiosCall<AxiosResponse>(
      { method: "patch", url: `/${id}`, params },
      opts
    );
  }

  async delete(id: string | number, opts: RestApiServiceOptions = {}) {
    return this.axiosCall<void>({ method: "delete", url: `/${id}` }, opts);
  }
}
