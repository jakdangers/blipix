export interface User {
  userID: string
  fullName: string
  userName: string
}

export interface Task {
  taskID: string
  title: string
  emoji: string
  duration: string
  startDate: Date
  endDate: Date
  week: string[]
  plannedTime: Date
  alarm: boolean
  participants: User[]
}

export interface Mission {
  id: string
  authorID: string
  title: string
  emoji: string
  duration: string
  startDate: Date
  endDate: Date
  planTime: Date
  alarm: boolean
  weekDay: string[]
  type: string
  status: string
}
