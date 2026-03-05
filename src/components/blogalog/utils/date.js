/* upd: 7-4-2021

  dayjs helpers

*/

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'

dayjs.extend(relativeTime)

export const niceDate = (value) => {
  if (value) {
    return dayjs(String(value)).format('MMMM D, YYYY')
  }
}


export const niceDateShort = (value, format = 'MMM D, YYYY') => {
  if (value) {
    return dayjs(String(value)).format('MMM D, YYYY')
  }
}


export const niceTimeDate = (value, format = 'h:mm a, MMM D') => {
  if (value) {
    return dayjs(String(value)).format(format)
  }
}

export const dateTo = (value) => {
  let monthsDiff = dayjs().diff(String(value), "month");
  if (value && monthsDiff < 2) {
    return dayjs().to(dayjs(String(value)))
  }

  // for 2mo+ old dates just return the actual date
  return niceDate(value)
}

// adds a "z" to adjust for UTC to local time
// will return "5 minutes ago" given a UTC time
export const dateFromLocal = (value) => {
  value = String(value)
  if (!value.toLowerCase().includes('z'))
    value += 'z'
  return dayjs(String(value)).fromNow()
}


export const dateDiff = (value, diff) => {
  if (value) {
    return dayjs().diff(dayjs(String(value)), diff)
  }
}

export const isBefore = (value) => {
  if (value) {
    return dayjs().isBefore(dayjs(String(value))) // is today before the value?
  }
}

export const today = (value, format = 'MMMM D, YYYY') => {
  if (value) {
    return dayjs(today).format(format)
  }
}

export const todayCitation = (value, format = 'D MMMM, YYYY') => {
  if (value) {
    return dayjs(today).format(format)
  }
}




// Notion Dates

export function getNotionStartDate(ndate, format = 'MMMM DD, YYYY') {
  if (!ndate) return null
  ndate = ndate.start_date

  const day = dayjs(ndate)
  return day.format('MMMM DD, YYYY')
}


