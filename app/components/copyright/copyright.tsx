import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle,Dimensions } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../text/text"

const {width,height} = Dimensions.get('screen'); 

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  alignItems:'center',
  position:'absolute',
  top:height-130,
  left:width/8
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
 * Describe your component here
 */
export const Copyright = React.memo(()=> {
  return (
    <View style={CONTAINER}>
      <Text style={TEXT}>Copyright&copy;2022 Tahaluf Al Emarat Technical Solutions</Text>
      <Text style={TEXT}>All rights reserved</Text>
    </View>
  )
})
