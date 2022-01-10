import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Platform } from "react-native"
import { load, loadString } from "../../utils/storage"
import { withEnvironment } from "../extensions/with-environment"
import DeviceInfo from "react-native-device-info"
import { User } from "../authentication/authentication"

/**
 * Model description here for TypeScript hints.
 */
export const NotificationModel = types
  .model("Notification")
  .extend(withEnvironment)
  .props({})
  .actions((self) => ({
    registerMobileInstances: flow(function* () {
      try {
        const fcmDeviceToken = yield loadString("fcmToken")
        const userData: User = yield load("user-data")
        const payLoad = {
          DeviceToken: fcmDeviceToken,
          Platform: Platform.OS,
          OS: Platform.OS,
          OSVersion: Platform.Version,
          DeviceModel: DeviceInfo.getModel(),
          UUID: DeviceInfo.getUniqueId(),
          Email: userData.Email,
        }
        yield self.environment.api.registerMobileInstances(payLoad)
      } catch (error) {}
    }),
    updateMobileInstances: flow(function* () {
      try {
        const fcmDeviceToken = yield loadString("fcmToken");
        yield self.environment.api.updateMobileInstances(fcmDeviceToken)
      } catch (error) {}
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type NotificationType = Instance<typeof NotificationModel>
export interface Notification extends NotificationType {}
type NotificationSnapshotType = SnapshotOut<typeof NotificationModel>
export interface NotificationSnapshot extends NotificationSnapshotType {}
export const createNotificationDefaultModel = () => types.optional(NotificationModel, {})
