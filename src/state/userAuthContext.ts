import { atom } from 'recoil'

export interface UserAuthContext {
  id: string
  nickName: string
  email: string
  friendCode: string
  accessToken: string
  isSignIn: boolean
}

export const userAuthContextState = atom<UserAuthContext>({
  key: 'userAuthContext',
  default: {
    id: '9f55c3e8-109d-4065-afcc-55b6953c86d4',
    nickName: 'lutory@naver.com',
    email: 'lutory@naver.com',
    friendCode: 'e79a2614',
    accessToken: 'test_token',
    isSignIn: false,
  } as UserAuthContext,
})
