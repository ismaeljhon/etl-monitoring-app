import axios, { AxiosInstance } from "axios";

interface RestApiServiceOptions {
  prefix?: string;
  axiosInstance?: AxiosInstance;
}

export default abstract class RestApiService<
  Entity,
  GetListDto = Record<string, any>,
  CreateDto = Record<string, any>,
  UpdateDto = Record<string, any>
> {
  protected axiosInstance: AxiosInstance;

  constructor(opts: RestApiServiceOptions = {}) {
    const { prefix = "", axiosInstance = null } = opts;

    this.axiosInstance =
      axiosInstance ??
      axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/${prefix}`,
      });
  }

  async getList(params?: GetListDto): Promise<Entity[]> {
    const { data = [] } = await this.axiosInstance.get("/", {
      params,
    });
    return data;
  }

  async get(id: string | number): Promise<Entity> {
    const { data = [] } = await this.axiosInstance.get(`/${id}`);
    return data;
  }

  async insert(params: CreateDto): Promise<Entity> {
    return this.axiosInstance.post("/", params);
  }

  async update(params: UpdateDto, id: number | string): Promise<Entity> {
    return this.axiosInstance.patch(`/${id}`, params);
  }

  async delete(id: string | number): Promise<void> {
    this.axiosInstance.delete(`/${id}`);
  }
}
