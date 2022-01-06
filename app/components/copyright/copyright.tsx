import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
const CONTAINER: ViewStyle = {
  justifyContent: "center",
  alignItems:'center',
  position:'absolute',
  bottom:20,
  left:'0%',
  right:0
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 12,
  color: color.palette.white,
}

export interface CopyrightProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * CopyRight Component
 */
export const Copyright = React.memo(()=> {
  return (
    <View style={CONTAINER}>
      <Text style={TEXT}>Copyright&copy;2022 Tahaluf Al Emarat Technical Solutions</Text>
      <Text style={TEXT}>All rights reserved.</Text>
    </View>
  )
})
