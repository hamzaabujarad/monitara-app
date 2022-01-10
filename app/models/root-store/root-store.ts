import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationModel } from "../authentication/authentication"
import { NotificationModel } from "../notification/notification"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore:types.optional(AuthenticationModel,{}),
  notificationStore:types.optional(NotificationModel,{})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
