/**
 * 获取指定月份的日期数
 * @param yearMonth 年份-月份。例如 2021-10
 * @returns 指定月份的日期数
 */
export function getDaysInMonth(yearMonth: string) {
  const [year, month] = yearMonth.split('-')
  const date = new Date(+year, +month, 0) // 这里获取到的是指定月份的最后一天
  return date.getDate()
}
