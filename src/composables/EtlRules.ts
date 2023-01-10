import { ref } from 'vue'
import moment from 'moment'

export default {}

export function useEtlCompanyRestriction (code: string) {
  let isCompanyRestrictedToRunEtl = ref(false)

  // Company code should be listed in uppercase manner
  const companyCodesNotIncludedInTimeRestriction = ['A00']

  if (!companyCodesNotIncludedInTimeRestriction.includes(code.toUpperCase()) && isInRestrictedTime()) {
    isCompanyRestrictedToRunEtl.value = true
  }

  return {
    isCompanyRestrictedToRunEtl
  }
}

function isInRestrictedTime () {
  const format = 'HH:mm'
  const currentDateTime = moment()
  const from = moment('18:00', format)
  const to = moment('23:59', format)
  const from2 = moment('00:00', format)
  const to2 = moment('04:00', format)

  // Should have a 2 sets of checking the time range (6pm-11:59pm, 12am-4am)
  return currentDateTime.isBetween(from, to) || currentDateTime.isBetween(from2, to2)
}