import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const AppthemeModel = types
  .model("Apptheme")
  .props({
    darkMode: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get isDarkMode() {
      return self.darkMode
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    updateDarkMode(darkMode: boolean) {
      self.darkMode = darkMode
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type AppthemeType = Instance<typeof AppthemeModel>
export interface Apptheme extends AppthemeType {}
type AppthemeSnapshotType = SnapshotOut<typeof AppthemeModel>
export interface AppthemeSnapshot extends AppthemeSnapshotType {}
export const createAppthemeDefaultModel = () => types.optional(AppthemeModel, {})
