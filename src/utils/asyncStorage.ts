import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserAuthContext } from '../state/userAuthContext'

export async function createAsyncStorageUserAuthContext(
  userAuthContext: UserAuthContext,
) {
  await AsyncStorage.setItem('userAuthContext', JSON.stringify(userAuthContext))
}

export async function getAsyncStorageUserAuthContext(): Promise<UserAuthContext | null> {
  const userAuthContext = await AsyncStorage.getItem('userAuthContext')

  if (userAuthContext) {
    return JSON.parse(userAuthContext) as UserAuthContext
  }

  return null
}

export async function DeleteAsyncStorageUserAuthContext() {
  await AsyncStorage.removeItem('userAuthContext')
}
