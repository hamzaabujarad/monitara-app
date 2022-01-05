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

export type GetLoginResult = { kind?: "ok"; login: Login } | GeneralApiProblem

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
