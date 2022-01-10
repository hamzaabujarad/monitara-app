import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment, withRootStore } from ".."
import jwt_decode from "jwt-decode"
import { load, save } from "../../utils/storage"

export interface User {
  Account: string
  Email: string
  Guid: string
  Name: string
  TimeZoneOffset: string
  Type: string
  aud: string
  exp: number
  iss: string
  accessToken: string
}

/**
 * AuthenticationModel
 */
export const AuthenticationModel = types
  .model("Authentication")
  .extend(withEnvironment)
  .extend(withRootStore)
  .props({
    isSignedIn: types.optional(types.boolean, false),
    identifier: types.optional(types.string, ""),
    accessToken: types.optional(types.string, ""),
  })
  .actions((self) => ({
    updateIsSignedIn(signedIn: boolean) {
      self.isSignedIn = signedIn
    },
    updateAccessToken(accessToken: string) {
      self.accessToken = accessToken
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    login: flow(function* (identifier: string, secret: string) {
      const { login, kind } = yield self.environment.api.login(identifier, secret)
      if (kind === "ok" && !login.errorMessages.length) {
        const decode: User = jwt_decode(login.accessToken)
        decode["accessToken"] = login.accessToken
        decode["password"] = secret
        //save user data based on access token decoder data
        yield save("user-data", decode)
        yield self.rootStore.notificationStore.registerMobileInstances()
        self.updateIsSignedIn(true)
        self.updateAccessToken(login.accessToken)

        return true
      } else {
        throw new Error(login.errorMessages)
      }
    }),
  }))
  .actions((self) => ({
    async checkIfUserSignIn() {
      try {
        const userData: User = await load("user-data")
        if (userData == null) return false
        return true
      } catch (error) {
        return false
      }
    },
  }))

type AuthenticationType = Instance<typeof AuthenticationModel>
export interface Authentication extends AuthenticationType {}
type AuthenticationSnapshotType = SnapshotOut<typeof AuthenticationModel>
export interface AuthenticationSnapshot extends AuthenticationSnapshotType {}
export const createAuthenticationDefaultModel = () => types.optional(AuthenticationModel, {})
