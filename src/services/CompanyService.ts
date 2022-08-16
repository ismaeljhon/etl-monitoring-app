import { Company } from "../interfaces/company.interface";
import ApiService from "./base/ApiService";


interface ApiServiceConstructorParams {
  prefix?: string;
}

export default abstract class CompanyService extends ApiService {
  private prefix?: string;

  constructor(params?: ApiServiceConstructorParams) {
    super({
      baseURL: import.meta.env.VITE_COMPANY_URL,
      headers: {
        Authorization: import.meta.env.VITE_COMPANY_AUTH,
      },
    });
    this.prefix = params?.prefix || "";
  }

  async getList() {
    return super
      .request({
        url: this.prefix
      })
      .then((res) => res.data)
  }
}