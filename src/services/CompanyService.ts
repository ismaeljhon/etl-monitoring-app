import { Company } from "../interfaces/company.interface";
import companiesJson from "../assets/companies.json";
import ApiService from "./base/ApiService";

interface ApiServiceConstructorParams {
  prefix?: string;
}

export default class CompanyService extends ApiService {
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

  async getList () {
    try {
      const response = await super.request({
        url: "https://accounts.detailonline.com/api/companies",
        method: "POST",
        headers: {
          Authorization: import.meta.env.VITE_COMPANY_AUTH,
        },
      });
      return response
    } catch (error) {
      if (error) {
        return companiesJson;
      }
    }
  }
}
