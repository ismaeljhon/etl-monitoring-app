import { TriggerLogs, GetLogsDto, TriggerRequestDto, TriggerStatus } from './../interfaces/evaluate-etl.interface';
import ApiService from "./base/ApiService";
import { date, uid } from "quasar";
import MsalService from './base/MsalService';
import { AccountInfo } from '@azure/msal-common';
import { useEtlCompanyRestriction } from '../composables/EtlRules'

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

  async triggerEtl (triggerRequestParams: TriggerRequestDto) {
    return super
      .request({
        url: 'trigger/app',
        method: "POST",
        data: {
          ...triggerRequestParams,
          date: date.formatDate(triggerRequestParams.date, "YYYY-MM-DD")
        },
      })
      .then((res) => {
        const { data = {} } = res
        const { success = false } = data;

        // save logs after trigger request
        if (success)
          this.saveLog(triggerRequestParams)

        return res.data
      });
  }

  async saveLog (saveLogParams: TriggerRequestDto): Promise<void> {
    const { code: company_code, date: start_date_requested } = saveLogParams
    const timeStamp = Date.now()

    const activeAccount: AccountInfo | null = await new MsalService().getActiveAccount()
    const username = activeAccount?.username

    if (!username)
      return console.error("Cannot save logs username not found")

    /**
     * Add remarks just in case the etl trigger requests during restricted time range (6pm - 4am)
     */
    const { isCompanyRestrictedToRunEtl } = useEtlCompanyRestriction(company_code.toUpperCase())
    const remarks = isCompanyRestrictedToRunEtl.value ? 'Force Trigger during restricted time range' : ''

    const saveLogData: TriggerLogs = {
      uuid: uid(),
      username,
      company_code: company_code.toLowerCase(),
      datetime: date.formatDate(timeStamp, 'YYYY/MM/DD HH:mm:ss'),
      start_date_requested,
      webjob_type: 'etl',
      status: TriggerStatus.start,
      remarks
    }

    const containerName = `${import.meta.env.VITE_AZURE_STORAGE_PREFIX}${company_code.toLowerCase()}`
    const fileName = `etl/logs/${date.formatDate(timeStamp, 'YYYY/YYYY-MM')}.json`

    let currentLogs: TriggerLogs[] = []

    // get current logs from azure storage
    try {
      currentLogs = await this.getLog({ containerName, fileName })
    } catch (e) {
      console.error("Error on fetching logs: ", e)
    }

    // append the new logs to current logs
    const json = [...currentLogs, saveLogData];

    // save logs to azure storage
    try {
      await super.request({
        url: 'log/save',
        method: 'POST',
        data: {
          containerName,
          fileName,
          json
        }
      }).catch(e => {
        throw e
      })
    } catch (e) {
      console.error(e)
    }
  }

  async getLog (getLogsParams: GetLogsDto): Promise<TriggerLogs[]> {
    const { containerName, fileName } = getLogsParams
    return super.request({
      method: 'POST',
      url: 'log/retrieve',
      data: {
        containerName,
        fileName
      }
    }).then(res => res.data)
  }
}
