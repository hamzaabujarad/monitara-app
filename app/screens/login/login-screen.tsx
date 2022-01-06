import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { Copyright, Logo, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { Box, Button, Input, Stack } from "native-base"
import Ionicons from "react-native-vector-icons/Ionicons"
import { translate } from "../../i18n/translate"
import { Formik } from "formik"
import { LoginSchema } from "../../utils/validations"
import { showToast } from "../../utils/general-utils"

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

  const [securePasswordText, setSecurePasswordText] = React.useState(true)
  const [email, setEmail] = React.useState("q.hammouri@tahaluf.ae")
  const [password, setPassword] = React.useState("M0n!t@r@P@$$w0r6")
  const [loading, setLoading] = React.useState(false)

  //refs
  const emailInputRef: any = React.createRef()
  const passwordInputRef: any = React.createRef()
  // Pull in navigation via hook
  // const navigation = useNavigation()

  const renderLogo = () => {
    return <Logo style={LogoStyle} />
  }

  const onLoginButtonPressed = () => {
    setLoading(true)
    authenticationStore
      .login(email, password)
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        showToast(error.message, "error", 4000)
      })
  }

  const renderLogoText = () => {
    return <Text style={logoTextStyle} text="Monitara." />
  }

  const renderEmailInput = () => {
    return (
      <Input
        ref={emailInputRef}
        editable={!loading}
        defaultValue="q.hammouri@tahaluf.ae"
        autoCapitalize="none"
        autoCompleteType="off"
        autoCorrect={false}
        returnKeyType="next"
        onChangeText={(v) => setEmail(v)}
        w={{ base: "75%" }}
        h={{ base: "16%" }}
        onSubmitEditing={() => passwordInputRef.current.focus()}
        bgColor={color.palette.white}
        placeholder={`${translate("loginScreen.emailPlaceHolder")}`}
      />
    )
  }

  const switchSecureText = () => {
    setSecurePasswordText(!securePasswordText)
  }

  const renderSecureTextButton = () => {
    return (
      <Box paddingRight={2}>
        <Ionicons
          size={21}
          color={color.palette.lightGrey}
          onPress={switchSecureText}
          name={securePasswordText ? "eye" : "eye-off"}
        />
      </Box>
    )
  }

  const renderPasswordInput = () => {
    return (
      <Input
        ref={passwordInputRef}
        defaultValue="M0n!t@r@P@$$w0r6"
        editable={!loading}
        secureTextEntry={securePasswordText}
        maxLength={15}
        w={{ base: "75%" }}
        h={{ base: "16%" }}
        onChangeText={(v) => setPassword(v)}
        bgColor={color.palette.white}
        placeholder={`${translate("loginScreen.passwordPlaceHolder")}`}
        InputRightElement={renderSecureTextButton()}
      />
    )
  }

  const renderLoginButton = (setFieldValue) => {
    return (
      <Button
        disabled={loading}
        isLoading={loading}
        onPressIn={onLoginButtonPressed}
        isLoadingText={"logging"}
        colorScheme="orange"
        width={"75%"}
        onPress={() => [setFieldValue("email", email), setFieldValue("password", password)]}
      >
        {translate("loginScreen.login")}
      </Button>
    )
  }

  const renderLoginControls = () => {
    return (
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validationSchema={LoginSchema}
      >
        {({ errors, setFieldValue }) => {
          {
            return (
              <Stack space={6} w="100%" alignItems="center">
                {renderEmailInput()}
                {renderPasswordInput()}
                {renderLoginButton(setFieldValue)}
              </Stack>
            )
          }
        }}
      </Formik>
    )
  }

  const renderCopyRightLabel = () => {
    return <Copyright />
  }

  return (
    <Screen style={ROOT} preset="fixed">
      <Box justifyContent={"center"} alignItems={"center"} marginTop={"10%"}>
        {renderLogo()}
        {renderLogoText()}
        {renderLoginControls()}
      </Box>
      {renderCopyRightLabel()}
    </Screen>
  )
})
