import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { flatten } from "ramda"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images/images"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

export interface LogoProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * logo component using fastImage
 */
export const Logo =React.memo((props: LogoProps)=> {
  const { style } = props
  const styles = flatten([CONTAINER, style])

  return (
    <FastImage
      style={styles}
      source={images.logo}
      resizeMode={FastImage.resizeMode.contain}
    />
  )
})
