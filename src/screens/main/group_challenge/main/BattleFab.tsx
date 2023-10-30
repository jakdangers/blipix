import React from 'react'
import { FAB } from 'react-native-paper'
import { colors } from '../../../../utils/consts'

interface TaskFabProps {
  navigateToChallengeList: () => void
  navigateToChallengeCreate: () => void
}

export default function BattleFab({
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
          label: '초대코드로 추가하기',
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
          label: '그룹 챌린지 만들기',
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
