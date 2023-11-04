export interface GroupChallengeHistory {
  id: number
  userId: string
  challengeId: number
  frontImage: string
  backImage: string
}

export interface GroupChallengeResponse {
  challengeHistories: GroupChallengeHistory[]
}
