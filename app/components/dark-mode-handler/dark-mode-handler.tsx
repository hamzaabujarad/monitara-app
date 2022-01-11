import * as React from "react"
import { Appearance } from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"

/**
 * this component catch appearance change and update appTheme store
 */
export const DarkModeHandler = observer(function DarkModeHandler() {
  //pull mst store
  const { appThemeStore } = useStores()
  React.useEffect(() => {
    appThemeStore.updateDarkMode(Appearance.getColorScheme() == "dark" ? true : false)
    console.log(appThemeStore.isDarkMode)
    Appearance.addChangeListener(onColorSchemeChange)

    return () => {
      Appearance.removeChangeListener(onColorSchemeChange)
    }
  }, [])
  function onColorSchemeChange(preferences: Appearance.AppearancePreferences) {
    appThemeStore.updateDarkMode(preferences.colorScheme == "dark" ? true : false)
  }

  return null
})
