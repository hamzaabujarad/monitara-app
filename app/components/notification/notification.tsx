import * as React from "react"
import notifee from "@notifee/react-native"
import messaging from "@react-native-firebase/messaging"
import { saveString } from "../../utils/storage/storage"

/**
 * Notification controller component
 */
export const Notification = React.memo(() => {
  React.useEffect(() => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("remote", remoteMessage)
      displayNotification(remoteMessage)
    })
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      displayNotification(remoteMessage)
    })
    return unsubscribe
  }, [])

  async function displayNotification(remoteMessage) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    })

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        smallIcon: "ic_launcher", // optional, defaults to 'ic_launcher'.
      },
    })
  }

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
  return null
})
