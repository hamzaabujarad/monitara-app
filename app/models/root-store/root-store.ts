import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AppthemeModel } from "../apptheme/apptheme"
import { AuthenticationModel } from "../authentication/authentication"
import { NetInfoModel } from "../net-info/net-info"
import { NotificationModel } from "../notification/notification"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore:types.optional(AuthenticationModel,{}),
  notificationStore:types.optional(NotificationModel,{}),
  appThemeStore:types.optional(AppthemeModel,{}),
  netInfoStore:types.optional(NetInfoModel,{}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
