export interface Author {
  userID: string
  fullName: string
  userName: string
}

export interface Pixel {
  pixelID: string
  frontImage: string
  backImage: string
  executed: boolean
  author: Author
}

export interface Task {
  taskID: string
  title: string
  emoji: string
  plannedTime: Date
  pixels: Pixel[]
}

export interface MissionHistory {
  id: number
  userID: string
  missionID: number
  title: string
  emoji: string
  status: string
  planTime: Date
  frontImage: string
  backImage: string
}

export interface MissionHistoryResponse {
  missionHistories: MissionHistory[]
}
