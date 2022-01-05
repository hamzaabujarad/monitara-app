import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { Logo, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { Box, Button, Center, Icon, Input, Stack } from "native-base"
import Ionicons from "react-native-vector-icons/Ionicons"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}
const LogoStyle: ViewStyle = {
  width: 150,
  height: 150,
}
const logoTextStyle: TextStyle = {
  fontSize: 20,
  marginBottom: 20,
}

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const { authenticationStore } = useStores()

  // <Button onPress={()=>authenticationStore.login("q.hammouri@tahaluf.ae","M0n!t@r@P@$$w0r6")}/>
  // Pull in navigation via hook
  // const navigation = useNavigation()

  const renderLogo = () => {
    return <Logo style={LogoStyle} />
  }

  const renderLogoText = () => {
    return <Text style={logoTextStyle} text="Monitara." />
  }
  const renderLoginControls = () => {
    return (
      <Stack space={8} w="100%" alignItems="center">
        <Input
          w={{
            base: "75%",
            md: "25%",
          }}
          h={{
            base: "16%",
          }}
          background={color.palette.white}
          // InputLeftElement={
          //   <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />
          // }
          placeholder="Email"
        />
        <Input
          w={{
            base: "75%",
            md: "25%",
          }}
          h={{
            base: "16%",
          }}
          background={color.palette.white}
          // InputRightElement={
          //   <Icon as={<Ionicons name="eye" />} size={5} mr="2" color="muted.400" />
          // }
          placeholder="Password"
        />
        <Button
          // backgroundColor={"#f59e0b"}
          width={"75%"}
          onPress={()=>console.log("hi")}

          // leftIcon={<Icon as={Ionicons} name="cloud-upload-outline" size="sm" />}
        >
         Login
        </Button>
      </Stack>
    )
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <Box justifyContent={"center"} alignItems={"center"} marginTop={"20%"}>
        {renderLogo()}
        {renderLogoText()}
        {renderLoginControls()}
      </Box>
    </Screen>
  )
})
