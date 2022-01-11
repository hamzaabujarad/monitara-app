import React from "react"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { Box, Divider, VStack,  HStack, Pressable, Icon } from "native-base"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Logo ,Text} from "../components"
import { typography } from "../theme"
import { translate } from "../i18n"

export const CustomDrawerContent =  (props) => {
  const getIcon = (screenName) => {
    switch (screenName) {
      case "home":
        return "home"
      case "dashboard":
        return "dashboard-customize"
      case "Favorites":
        return "heart"
      case "Archive":
        return "archive"
      case "Trash":
        return "trash-can"
      case "Spam":
        return "alert-circle"
      default:
        return undefined
    }
  }

  const renderLogoAndVersion = () => {
    return (
      <Box height={"24%"} justifyContent={"flex-start"} alignItems={"center"} flexDirection={"row"}>
        <Logo
          colored={true}
          style={{
            width: 70,
            height: 70,
          }}
        />
        <Text fontFamily={typography.primary} fontSize={17}>
          {"Monitara"}
        </Text>
      </Box>
    )
  }

  const renderDrawerItemButton = (index, name) => {
    const keyTranslate: string = `common.${name}`
    return (
      <Pressable
        px={3}
        py={3}
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
            color={index === props.state.index ? "primary.500" : "gray.500"}
            size={7}
            as={<MaterialIcons name={getIcon(name)} />}
          />
          
          <Text color={index === props.state.index ? "primary.500" : "gray.700"}>
            {translate(keyTranslate)}
          </Text>
        </HStack>
      </Pressable>
    )
  }
  const renderLogoutButton = (index, name) => {
    const keyTranslate: string = `common.${name}`
    return (
      <Pressable
        px={3}
        py={3}
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
            color={index === props.state.index ? "primary.500" : "gray.500"}
            size={7}
            as={<MaterialIcons name={getIcon(name)} />}
          />
          <Text  color={index === props.state.index ? "primary.500" : "gray.700"}>
            {translate(keyTranslate)}
          </Text>
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
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  )
}
