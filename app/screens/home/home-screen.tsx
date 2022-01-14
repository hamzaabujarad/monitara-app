import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import WebView from "react-native-webview"
import { SafeAreaProvider } from "react-native-safe-area-context"

const ROOT: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const { width, height } = Dimensions.get("window")

export const HomeScreen = observer(function HomeScreen() {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlzaWQiOiIzYTAxNjVjYy1kZjljLTE4NDAtN2QwNC04ZmEzYmM4Mzg5NzIiLCJUeXBlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMzlmZTg2Y2UtNDQyMi00YzIwLThiZGYtMjgzZmI0NGExN2M0IiwiR3VpZCI6IjM5ZmU4NmNlLTQ0MjItNGMyMC04YmRmLTI4M2ZiNDRhMTdjNCIsIkVtYWlsIjoidXNlcjFAbWFycy5jb20iLCJOYW1lIjoiTWFycyBVc2VyIDEgIiwiQWNjb3VudCI6IntcIkd1aWRcIjpcIjM5ZmU4NmJlLWRmMzktNGMwZi05OWQyLThhMzBjNzA0MjVmNlwiLFwiQWNjb3VudE51bWJlclwiOlwiMjQ2VUc2XCIsXCJOYW1lXCI6XCJBZG1pbiBNYXJzXCIsXCJJc0VuYWJsZWRcIjp0cnVlLFwiQ3JlYXRlZEJ5XCI6XCJVTktOT1dOXCIsXCJNb2RpZmllZEJ5XCI6bnVsbCxcIklkXCI6MSxcIkNyZWF0ZWRPblwiOlwiMjAyMS0wOC0yM1QyMzo1MjoxMlwiLFwiTW9kaWZpZWRPblwiOm51bGwsXCJUeXBlTmFtZVwiOlwiQWNjb3VudFwifSIsIlRpbWVab25lT2Zmc2V0Ijoie1wiU2hvcnREZXNjcmlwdGlvblwiOlwiKFVUQyswNDowMClcIixcIlRpY2tzXCI6MTQ0MDAwMDAwMDAwLFwiQ29kZVwiOlwiQXJhYmlhbiBTdGFuZGFyZCBUaW1lXCIsXCJEZXNjcmlwdGlvblwiOlwiKFVUQyswNDowMCkgQWJ1IERoYWJpLCBNdXNjYXRcIixcIklzRW5hYmxlZFwiOnRydWUsXCJJZFwiOjgwLFwiT2Zmc2V0VGltZXNwYW5cIjpcIjA0OjAwOjAwXCJ9IiwiZXhwIjoxNzk5ODY4NTAzLCJpc3MiOiJtb25pdGFyYS5jb20iLCJhdWQiOiJtb25pdGFyYS5jb20ifQ.e171FNzg0N3genflX0RDwulJ-snhteJYDHN4HZMl5l8`
  let myInjectedJs = ` window.sessionStorage.setItem("MONITARA_ACCESS_TOKEN", '${token}')`
  // Pull in one of our MST stores
  const { appThemeStore } = useStores()

  const INJECTED_JAVASCRIPT = `(function() {
    const tokenLocalStorage = window.localStorage.setItem('MONITARA_ACCESS_TOKEN','${token}');
    window.ReactNativeWebView.postMessage(tokenLocalStorage);
  })();`
  const onMessage = (payload) => {
    console.log("payload", payload)
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <WebView
      style={{
        width: width,
        height: height,
      }}
      source={{ uri: "https://dev.monitara.com/TenantManagement/ProofOfConcept/Dashboard" }}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      onMessage={onMessage}
    />
  )
})
