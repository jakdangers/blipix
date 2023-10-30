import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-ui-lib'

interface Props {
  title: string
}

export default function HeaderSample({ title }: Props ) {
  return (
    <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'red', width: '100%'}}>
      <Text>HeaderSample</Text>
    </View>
  )
}
