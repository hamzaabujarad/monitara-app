import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const NetInfoModel = types
  .model("NetInfo")
  .props({
    isInternetReachable: types.optional(types.boolean, true),
  })
  .actions((self) => ({
    updateIsInternetReachable(isInternetReachable: boolean) {
      self.isInternetReachable = isInternetReachable
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type NetInfoType = Instance<typeof NetInfoModel>
export interface NetInfo extends NetInfoType {}
type NetInfoSnapshotType = SnapshotOut<typeof NetInfoModel>
export interface NetInfoSnapshot extends NetInfoSnapshotType {}
export const createNetInfoDefaultModel = () => types.optional(NetInfoModel, {})
