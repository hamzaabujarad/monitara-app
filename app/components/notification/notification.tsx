import * as React from "react"
import { Button, StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"

import notifee from "@notifee/react-native"

import messaging from "@react-native-firebase/messaging"
import { saveString } from "../../utils/storage/storage"
const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

export interface NotificationProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Notification = observer(function Notification(props: NotificationProps) {
  async function onDisplayNotification(remoteMessage) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    })

    // Display a notification
    await notifee.displayNotification({
      title: "Notification Title",
      body: "Main body content of the notification",
      android: {
        channelId,
        smallIcon: "ic_launcher", // optional, defaults to 'ic_launcher'.
      },
    })
  }

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("remoteMessage", JSON.stringify(remoteMessage))
      // onDisplayNotification(remoteMessage)
    })
    return unsubscribe
  }, [])

  React.useEffect(() => {
    requestUserPermission().then((isEnable) => {
      if (isEnable) {
        getDeviceFireBaseMessageToken()
      }
    })
  }, [])

  const getDeviceFireBaseMessageToken = () => {
    messaging()
      .getToken()
      .then(async (fcmToken) => {
        if (fcmToken) {
          await saveString("fcmToken", fcmToken)
          console.log("fcmToken", fcmToken)
        }
      })
      .catch((e) => {
        console.log("--notification--error", e)
      })
  }

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      console.log("Authorization status:", authStatus)
      return true
    }
    return false
  }
  return <Button title="Display Notification" onPress={() => onDisplayNotification("Asdasd")} />
})
