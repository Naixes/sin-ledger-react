export const LIST_VIEW = 'list'
export const CHART_VIEW = 'chart'
export const TYPE_INCOME = 'income'
export const TYPE_OUTCOME = 'outcome'

// 校验时间字符串
export const validateDate = (dateStr) => {
  // 校验格式
  const regEx = /^\d{4}-\d{2}-\d{2}$/
  if(!dateStr.match(regEx)) return false
  // 校验时间
  const d = new Date(dateStr)
  if(Number.isNaN(d.getTime())) return false
  return d.toISOString().slice(0, 10) === dateStr
}

// 给个位数前补0
export const padLeft = (n) => {
  let str = String(n)
  return n < 10 && !str.startsWith('0') ? '0' + n : n
}

// 返回当前年月
export const parseToYearAndMonth = (str) => {
  const date = str ? new Date(str) : new Date()
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1
  }
}

// 返回一个给定长度和起始值的数组
export const range = (size, startAt) => {
  let arr = []
  for (let index = 0; index < size; index++) {
    arr[index] = startAt + index    
  }
  return arr
}

export const Colors = {
  blue: '#347eff',
  deepBlue: '#61dafb',
  green: '#28a745',
  red: '#dc3545',
  gray: '#555',
  lightGray: '#efefef',
  white: '#fff',
}