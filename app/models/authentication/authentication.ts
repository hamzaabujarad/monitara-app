import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from ".."

/**
 * Model description here for TypeScript hints.
 */
export const AuthenticationModel = types
  .model("Authentication")
  .extend(withEnvironment)
  .props({
    identifier: types.optional(types.string, ""),
    token:types.optional(types.string, "")
  })
  .views((self) => ({
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    login: flow(function* (identifier:string,secret:string) {
      const {login,kind} = yield self.environment.api.login(identifier,secret);
      if (kind === "ok"&&!login.errorMessages.length) {
        console.log("yesss")
  
      } else {
        console.log("nooo")
    
      }

    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type AuthenticationType = Instance<typeof AuthenticationModel>
export interface Authentication extends AuthenticationType {}
type AuthenticationSnapshotType = SnapshotOut<typeof AuthenticationModel>
export interface AuthenticationSnapshot extends AuthenticationSnapshotType {}
export const createAuthenticationDefaultModel = () => types.optional(AuthenticationModel, {})
