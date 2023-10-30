import { constants } from './consts'

export function KrTimeFrom(time: Date, mode: string) {
  const hours = time.getHours() // 0-23 사이의 시간
  const minutes = time.getMinutes() // 0-59 사이의 분
  const seconds = time.getSeconds() // 0-59 사이의 초

  const ampm = hours >= 12 ? '오후' : '오전'
  const formattedHours = hours % 12 || 12 // 12시간 표시로 변환

  if (mode === 'AMPM-HH-MM-SS') {
    return `${ampm} ${formattedHours}시 ${minutes}분 ${seconds}초`
  }

  if (mode === constants.YYYY_MM_DD_DAY) {
    return `${time.getFullYear()}년 ${
      time.getMonth() + 1
    }월 ${time.getDate()}일 ${time.getDay()}요일`
  }

  return `${ampm} ${formattedHours}시 ${minutes}분`
}
