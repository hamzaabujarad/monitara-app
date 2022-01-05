import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle,Dimensions } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../text/text"

const {width,height} = Dimensions.get('window'); 

const CONTAINER: ViewStyle = {
  flex:1,
  justifyContent: "center",
  alignItems:'center',
  position:'absolute',
  top:height/1.2,
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
