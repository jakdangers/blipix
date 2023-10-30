export interface GroupChallenge {
  id: number
  userId: string
  title: string
  description: string
  emoji: string
  startDate: Date
  endDate: Date
  planTime: Date
  alarm: boolean
  weekDay: string[]
  duration: string
  type: string
  status: string
}
