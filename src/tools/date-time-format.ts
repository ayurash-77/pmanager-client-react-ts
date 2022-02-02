import { format, parseISO } from 'date-fns'

export function toDateStr(date: Date): string {
  return date ? format(parseISO(date.toString()), 'yyyy.MM.dd HH-mm') : '---'
}
