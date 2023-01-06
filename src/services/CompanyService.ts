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
        headers: {
          Authorization: import.meta.env.VITE_COMPANY_AUTH,
        },
      });

      const { data = [] } = response
      const { companies = [] } = data
      return companies
    } catch (error) {
      if (error) {
        return companiesJson;
      }
    }
  }
}
