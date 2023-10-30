export type MainBottomTabParamList = {
  task: undefined
  friend: undefined
  make: undefined
  setting: undefined
}

// 풀 스크린을 사용
export type MainRootStackParamsList = {
  mainRootChallengeCreate: {
    challengeType: string
  }
  mainRootTaskUpdate: undefined
  mainRootTaskPixelDetail: {
    historyID: number
  }
  mainRootMissionCamera: {
    missionID: number
  }
  mainRootTaskCollaborate: undefined
  mainRootProfileSetting: undefined
  mainRootProfileAlarm: undefined
  mainRootProfileTOS: undefined
  mainRootProfilePrivacy: undefined
  mainRootProfileUpdate: undefined
  mainRootGroupChallengeTopTab: {
    challengeId: number
  }
}

export type ChallengeStackParamList = {
  challengeMain: undefined
  challengeList: undefined
}

export type GroupChallengeStackParamList = {
  groupChallengeMain: undefined
}

export type ProfileStackParamList = {
  profileMain: undefined
}

export type GroupChallengeTopTabParamList = {
  groupChallengeTopTabMain: {
    challengeId: number
  }
  groupChallengeTopTabLive: {
    challengeId: number
  }
}
