import { format, parseISO } from 'date-fns'

export function toDateStr(date: Date): string {
  return date ? format(parseISO(date.toString()), 'yyyy.MM.dd') : '---'
}

export function toTimeStr(date: Date): string {
  return date ? format(parseISO(date.toString()), 'HH:mm') : '---'
}

export function toDateTimeStr(date: Date): string {
  return date ? format(parseISO(date.toString()), 'yyyy.MM.dd HH:mm') : '---'
}

export function toYearStr(date: Date): string | null {
  return date ? format(parseISO(date.toString()), 'yyyy') : null
}

export function toQuarterStr(date: Date): string | null {
  return date ? format(parseISO(date.toString()), 'yyyy-Q') : null
}
