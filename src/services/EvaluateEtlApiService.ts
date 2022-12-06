import ApiService from "./base/ApiService";
import { date } from "quasar";
import { TriggerRequestParams } from '../interfaces/evaluate-etl.interface'

export default class EvaluateEtlApiService extends ApiService {
  constructor() {
    super({
      baseURL: import.meta.env.VITE_ETL_API_BASE_URL,
      headers: {
        "x-api-key": "fceeef5e-625c-45da-9d97-eb044b7500ba",
        "x-origin-url": "packages.detailonline.com",
        "Content-Type": "application/json",
      }
    })
  }

  async triggerEtl (triggerRequestParams: TriggerRequestParams) {
    return super
      .request({
        url: 'trigger/app',
        method: "POST",
        data: {
          ...triggerRequestParams,
          date: date.formatDate(triggerRequestParams.date, "YYYY-MM-DD")
        },
      })
      .then((res) => res.data);
  }
}
