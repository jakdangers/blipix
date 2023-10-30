import React from 'react'
import { Camera, useCameraDevice } from 'react-native-vision-camera'
import { Box, Text } from '@gluestack-ui/themed'
import { MainRootStackScreenProps } from '../../../../navigation/types'

export default function MissionCameraScreen({
  route,
  navigation,
}: MainRootStackScreenProps<'mainRootMissionCamera'>) {
  const device = useCameraDevice('back')

  if (device == null) {
    return (
      <Box>
        <Text>카메라를 찾을 수 없습니다.</Text>
      </Box>
    )
  }
  return <Camera style={{ flex: 1 }} device={device} isActive />
}
