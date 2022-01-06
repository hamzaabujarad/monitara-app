import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { flatten } from "ramda"
import ActionSheet from "react-native-actions-sheet"
const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface EnvironmentsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  actionSheetRef: any
}

/**
 * Describe your component here
 */
export const Environments = observer(function Environments(props: EnvironmentsProps) {
  const { style, actionSheetRef } = props
  const styles = flatten([CONTAINER, style])

  return (
    <ActionSheet openAnimationSpeed={16} indicatorColor={color.palette.brightTurquoise} gestureEnabled={true} containerStyle={{
      flex:1,
      height:220
    }} ref={actionSheetRef}>
      <View>
        <Text>YOUR CUSTOM COMPONENT INSIDE THE ACTIONSHEET</Text>
      </View>
    </ActionSheet>
  )
})
