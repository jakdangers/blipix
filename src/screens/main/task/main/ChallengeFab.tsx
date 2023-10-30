import React from 'react'
import { FAB } from 'react-native-paper'
import { colors } from '../../../../utils/consts'

interface TaskFabProps {
  navigateToChallengeList: () => void
  navigateToChallengeCreate: () => void
}

export default function ChallengeFab({
  navigateToChallengeList,
  navigateToChallengeCreate,
}: TaskFabProps) {
  const [state, setState] = React.useState({ open: false })

  const onStateChange = ({ open }: { open: boolean }) => setState({ open })

  const { open } = state

  return (
    <FAB.Group
      open={open}
      icon={open ? 'close' : 'plus'}
      backdropColor="rgba(0, 0, 0, 0.5)"
      visible
      color={colors.themeBlack}
      fabStyle={{
        backgroundColor: colors.pink,
        width: 40,
        height: 40,
        borderRadius: 20,
        right: 8,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      actions={[
        {
          icon: 'update',
          color: colors.themeBlack,
          label: '픽셀 관리',
          onPress: () => navigateToChallengeList(),
          style: {
            backgroundColor: colors.pink,
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          },
          labelTextColor: colors.themeWhite,
        },
        {
          icon: 'plus',
          color: colors.themeBlack,
          label: '챌린지 추가',
          onPress: () => navigateToChallengeCreate(),
          style: {
            backgroundColor: colors.pink,
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          },
          labelTextColor: colors.themeWhite,
        },
      ]}
      onStateChange={onStateChange}
    />
  )
}
