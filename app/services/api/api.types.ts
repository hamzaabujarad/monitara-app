import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"

export interface User {
  id: number
  name: string
}

export interface Login {
  accessToken: string
  errorMessages: []
  warningMessages: []
  infoMessages: []
  hasErrors: boolean
  hasWarnings: boolean
  hasInfos: boolean
}

export interface MobileAppInstances {
  DeviceToken: string
  Platform: string
  OS: string
  OSVersion: string | number
  DeviceModel: string
  UUID: string
  Email: string
}

export type GetLoginResult = { kind?: "ok"; login: Login } | GeneralApiProblem

export type GetMobileAppInstancesResult = { kind?: "ok" } | GeneralApiProblem

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
