import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { flatten } from "ramda"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images/images"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

export interface LogoProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  colored?: boolean
  stop?: boolean
}

/**
 * logo component using fastImage
 */
export const Logo = observer((props: LogoProps) => {
  //pull mst
  const {
    appThemeStore: { darkMode },
  } = useStores()
  const { style } = props
  const styles = flatten([CONTAINER, style])
  return (
    <FastImage
      style={styles}
      source={darkMode || props.stop ? images.logo : images.coloredLogo}
      resizeMode={FastImage.resizeMode.contain}
    />
  )
})
