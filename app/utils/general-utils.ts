import Toast from "react-native-toast-message";

/**
 * 
 * @param errorMessage 
 * @param type 
 * @param time 
 * @returns Toast
 */

export const showToast = (errorMessage:string, type:"error" |"success" | "info", time ) => {
  return Toast.show({
    type: type,
    position:"bottom",
    text2: errorMessage,
    visibilityTime:time
  });
}
