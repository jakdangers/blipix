import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { login } from '@react-native-seoul/kakao-login'
import { Image } from 'react-native'
import auth, { firebase } from '@react-native-firebase/auth'
import appleAuth from '@invertase/react-native-apple-authentication'
import { Box, Center, Pressable, Text, VStack } from '@gluestack-ui/themed'
import { useMutation } from 'react-query'
import { useSetRecoilState } from 'recoil'
import { AccountStackScreenProps } from '../../../navigation/types'
import { colors } from '../../../utils/consts'
import axiosInstance from '../../../utils/api'
import { userAuthContextState } from '../../../state/userAuthContext'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const appleLogin = require('../../../assets/account/apple_login.png')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const kakaoLogin = require('../../../assets/account/kakao_login.png')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const googleLogin = require('../../../assets/account/google_login.png')

interface OAuthCredentialRequest {
  email: string
  firebaseUID: string
  provider: string
}

interface OAuthCredentialResponse {
  id: string
  nickName: string
  email: string
  friendCode: string
  accessToken: string
}

export default function AccountLoginScreen({
  route,
  navigation,
}: AccountStackScreenProps<'login'>) {
  const setAuthContext = useSetRecoilState(userAuthContextState)

  const mutation = useMutation({
    mutationFn: (oc: OAuthCredentialRequest) => {
      return axiosInstance.post<OAuthCredentialResponse>('/users/login', oc)
    },
    onSuccess: (res) => {
      setAuthContext({
        id: res.data.id,
        nickName: res.data.nickName,
        email: res.data.email,
        friendCode: res.data.friendCode,
        accessToken: res.data.accessToken,
        isSignIn: true,
      })
      navigation.navigate('main', { screen: 'task' })
    },
  })

  const loginWithKakao = async (): Promise<void> => {
    try {
      const token = await login()
      const kakaoCredential = auth.OIDCAuthProvider.credential(
        'kakao',
        token.idToken
      )

      const userCredential = await firebase
        .auth()
        .signInWithCredential(kakaoCredential)

      mutation.mutate({
        email: userCredential.user.email ?? '',
        firebaseUID: userCredential.user.uid,
        provider: 'kakao',
      })
    } catch (err) {
      console.log(err)
    }
  }

  const loginWithApple = async (): Promise<void> => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })

      const { identityToken, nonce } = appleAuthRequestResponse

      if (identityToken) {
        const appleCredential = firebase.auth.AppleAuthProvider.credential(
          identityToken,
          nonce
        )

        const userCredential = await firebase
          .auth()
          .signInWithCredential(appleCredential)

        mutation.mutate({
          email: userCredential.user.email ?? '',
          firebaseUID: userCredential.user.uid,
          provider: 'apple',
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.themeBlack, flex: 1 }}>
      <VStack flex={1} justifyContent="flex-end">
        <Center flex={1}>
          <Text color={colors.themeWhite} fontWeight="$bold" fontSize="$2xl">
            BLIPIX
          </Text>
        </Center>
        <VStack
          py="$10"
          px="$4"
          backgroundColor={colors.pink}
          space="lg"
          borderTopRightRadius="$lg"
          borderTopLeftRadius="$lg"
        >
          <Text color={colors.themeBlack} fontWeight="$bold" textAlign="center">
            지금부터 추억을 함께해요!
          </Text>
          <Pressable onPress={loginWithKakao} h={42}>
            <Image
              source={kakaoLogin}
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
            />
          </Pressable>
          <Pressable onPress={loginWithApple} h={42}>
            <Image
              source={appleLogin}
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
            />
          </Pressable>
          <Pressable onPress={loginWithKakao} h={42}>
            <Image
              source={googleLogin}
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
            />
          </Pressable>
        </VStack>
      </VStack>
    </SafeAreaView>
  )
}
