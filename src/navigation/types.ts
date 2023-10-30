import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { AccountStackParamList } from './account/types'
import {
  ChallengeStackParamList,
  MainBottomTabParamList,
  ProfileStackParamList,
  GroupChallengeStackParamList,
  MainRootStackParamsList,
  GroupChallengeTopTabParamList,
} from './main/types'

export type RootStackParamList = {
  main: NavigatorScreenParams<MainBottomTabParamList>
  account: NavigatorScreenParams<AccountStackParamList>
  mainRoot: NavigatorScreenParams<MainRootStackParamsList>
}

export type MainRootStackScreenProps<T extends keyof MainRootStackParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<MainRootStackParamsList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

export type AccountStackScreenProps<T extends keyof AccountStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AccountStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >

export type MainBottomTabScreenProps<T extends keyof MainBottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainBottomTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >

export type MeStackScreenProps<T extends keyof ChallengeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ChallengeStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >

export type GroupChallengeStackScreenProps<
  T extends keyof GroupChallengeStackParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<GroupChallengeStackParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>

export type GroupChallengeTopTabScreenProps<
  T extends keyof GroupChallengeTopTabParamList,
> = CompositeScreenProps<
  NativeStackScreenProps<GroupChallengeTopTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ProfileStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >
