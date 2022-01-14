import Toast from "react-native-toast-message"
import RNRestart from "react-native-restart"
import jwt_decode from "jwt-decode"
import { User } from "../models"
import { save } from "./storage"
/**
 *
 * @param errorMessage
 * @param type
 * @param time
 * @returns Toast
 */

export const showToast = (
  errorMessage: string,
  type: "error" | "success" | "info",
  time,
  position: "top" | "bottom" = "bottom",
) => {
  return Toast.show({
    type: type,
    position: position,
    text2: errorMessage,
    visibilityTime: time,
  })
}

/**
 * restart the app
 * @returns function
 */
export const restartApplication = (): void => RNRestart.Restart()

/**
 * this function will decode access
 * @param accessToken user-access token
 * @param email user-email
 * @param password user-password
 */

export const decodeAccessTokenAndSaveUserData = async (
  accessToken: string,
  email: string,
  password: string,
): Promise<boolean> => {
  try {
    const decode: User = jwt_decode(accessToken)
    decode["accessToken"] =accessToken
    decode["password"] = password
    //save user data based on access token decoder data
    await save("user-data", decode)
    return true
  } catch (error) {
    return false
  }
}
