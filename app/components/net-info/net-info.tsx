import * as React from "react"
import { observer } from "mobx-react-lite"
import { default as NetWorkInfo } from "@react-native-community/netinfo"
import { useStores } from "../../models"

/**
 * this component handle if internet connection reachable or not 
 */
export const NetInfo = observer(function NetInfo() {
  //pull mst store
  const {
    netInfoStore: { updateIsInternetReachable },
  } = useStores()

  React.useEffect(() => {
    // Subscribe
    const unsubscribe = NetWorkInfo.addEventListener((state) => {
      if (state.isInternetReachable !== null) {
        updateIsInternetReachable(state.isInternetReachable)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return null
})
