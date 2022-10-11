import ApiService from "./base/ApiService";

interface ApiServiceConstructorParams {
  prefix?: string;
}

export default class EtlTriggerService extends ApiService {
  private prefix?: string;

  constructor(params?: ApiServiceConstructorParams) {
    super({
      baseURL: import.meta.env.VITE_ETL_TRIGGER_URL,
    });
    this.prefix = params?.prefix || "";
  }

  async triggerEtl(params) {
    console.log('service: ',params)
    return super.request({
      url: import.meta.env.VITE_ETL_TRIGGER_URL,
      method: 'POST',
      headers: {
        "x-api-key": "fceeef5e-625c-45da-9d97-eb044b7500ba",
        "x-origin-url": "packages.detailonline.com",
        "Content-Type": "application/json"
      },
      data: params
    })
    .then((res) => res.data)
  }
}