import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { appThemeStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen
      style={[
        ROOT,
        {
          backgroundColor: appThemeStore.isDarkMode ? color.background : color.palette.white,
        },
      ]}
      preset="scroll"
    >
      <Text>{"Home Screen"}</Text>
    </Screen>
  )
})
