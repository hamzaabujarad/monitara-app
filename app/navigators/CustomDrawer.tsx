import React from "react"
import { DrawerContentScrollView } from "@react-navigation/drawer"
import { Box, Divider, VStack, HStack, Pressable, Icon } from "native-base"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Logo, Text } from "../components"
import { translate } from "../i18n"
import { ImageStyle } from "react-native-fast-image"
import { Alert } from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "../models"
import { clear } from "../utils/storage"
import RNRestart from "react-native-restart"
const logoStyle: ImageStyle = {
  width: 50,
  height: 50,
}

export const CustomDrawerContent = observer(function CustomDrawerContent(props: any) {
  //pull mst from hooks
  const {
    authenticationStore: { updateIsSignedIn },
  } = useStores()

  //Match icon by name
  const getIcon = (screenName) => {
    switch (screenName) {
      case "home":
        return "home"
      case "dashboard":
        return "dashboard-customize"
      case "settings":
        return "settings"
      case "logout":
        return "logout"
      case "about":
        return "exclamation"
      default:
        return undefined
    }
  }

  const renderLogoAndVersion = () => {
    return (
      <Box px={2} justifyContent={"flex-start"} alignItems={"center"} flexDirection={"row"}>
        <Logo style={logoStyle} />
        <Text
          style={{
            fontSize: 19,
          }}
        >
          {"Monitara"}
        </Text>
      </Box>
    )
  }

  const onYesButtonPressed = () => {
    try {
      //clear all local storage
      clear()
      RNRestart.Restart()
    } catch (error) {}
  }

  const handleOnLogoutButtonPressed = () =>
    Alert.alert(translate("common.logout"), translate("common.logoutMessage"), [
      {
        text: translate("common.no"),
        style: "cancel",
      },
      { text: translate("common.yes"), onPress: onYesButtonPressed },
    ])

  const renderDrawerItemButton = (index, name) => {
    const keyTranslate: string = `common.${name}`
    return (
      <Pressable
        px={3}
        py={2.5}
        key={index}
        roundedTopRight={"3xl"}
        roundedBottomRight={"3xl"}
        bg={index === props.state.index ? "rgba(6, 182, 212, 0.1)" : "transparent"}
        onPress={(event) => {
          props.navigation.navigate(name)
        }}
      >
        <HStack space={2} alignItems="center">
          <Icon
            color={index === props.state.index ? "orange.500" : "gray.500"}
            size={7}
            as={<MaterialIcons name={getIcon(name)} />}
          />

          <Text>{translate(keyTranslate)}</Text>
        </HStack>
      </Pressable>
    )
  }

  const renderLogoutButton = () => {
    const keyTranslate: string = `common.logout`
    return (
      <Pressable
        px={3}
        py={2.5}
        roundedTopRight={"3xl"}
        roundedBottomRight={"3xl"}
        bg={"transparent"}
        onPress={handleOnLogoutButtonPressed}
      >
        <HStack space={2} alignItems="center">
          <Icon color={"gray.500"} size={7} as={<MaterialIcons name={getIcon("logout")} />} />

          <Text>{translate(keyTranslate)}</Text>
        </HStack>
      </Pressable>
    )
  }

  return (
    <DrawerContentScrollView {...props}>
      <VStack space={2} my={2} mx={1}>
        {renderLogoAndVersion()}
        <Divider />
        <VStack space={2}>
          {props.state.routeNames.map((name, index) => renderDrawerItemButton(index, name))}
          {renderLogoutButton()}
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  )
})
