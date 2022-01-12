import Toast from "react-native-toast-message"

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
 *
 */

export const saveDefaultEnvironment = () => {
  try {
    
  } catch (error) {}
}
