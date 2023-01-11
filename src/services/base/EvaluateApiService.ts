import ApiService from "../base/ApiService";

export default class EvaluateEtlApiService extends ApiService {
  constructor() {
    super({
      baseURL: import.meta.env.VITE_ETL_API_BASE_URL,
      headers: {
        "x-api-key": import.meta.env.VITE_EVALUATE_API_KEY,
        "x-origin-url": import.meta.env.VITE_EVALUATE_ORIGIN_URL,
        "Content-Type": "application/json",
      }
    })
  }

  clearCache (code: string) {
    return super.request({
      url: 'cache/clear',
      method: 'POST',
      data: {
        code
      }
    })
  }
}
