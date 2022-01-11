import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Logo, Screen } from "../../components"
import { useStores } from "../../models"
import { color } from "../../theme"
import { hasNotch } from "react-native-device-info"
import { useNavigation } from "@react-navigation/native"
const ROOT: ViewStyle = {
  backgroundColor: color.background,
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
}

export const SplashScreen = observer(function SplashScreen() {
  // Pull in one of our MST stores
  const {
    authenticationStore: { updateIsSignedIn, checkIfUserSignIn },
  notificationStore: { updateMobileInstances },
  } = useStores()
  // Pull in navigation via hook
  const navigation = useNavigation()

  const ifUserSignIn = () => {
    checkIfUserSignIn().then((isSign: boolean) => {
      if (isSign) {
        updateMobileInstances()
        updateIsSignedIn(true)
      }
      return navigation.navigate("login") as never
    })
  }
  // // check if userSignIn or not
  useEffect(() => {
    ifUserSignIn()
  }, [])

  return (
    <Screen style={ROOT} preset="fixed">
      <Logo
        stop={true}
        style={{
          width: 100,
          height: 100,
          marginBottom: !hasNotch() ? 1 : 47,
        }}
      />
    </Screen>
  )
})
