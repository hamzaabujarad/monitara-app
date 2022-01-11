import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { load } from "../../utils/storage"
import { User } from "../../models"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
    this.apisauce.addAsyncRequestTransform((request) => async () => {
      const userData: User = await load("user-data")
      if (userData) {
        request.headers["Authorization"] = `Bearer ${userData.accessToken}`
      }
    })
  }

  /**
   *  authenticate user
   */
  async login(identifier: string, secret: string): Promise<Types.GetLoginResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(
      `/PublicManagement/Auth/Login/User`,
      {
        Identifier: identifier,
        Secret: secret,
      },
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertLogin = (raw) => {
      return {
        accessToken: raw.Data,
        errorMessages: raw.ErrorMessages,
        warningMessages: raw.WarningMessages,
        infoMessages: raw.InfoMessages,
        hasErrors: raw.HasErrors,
        hasWarnings: raw.HasWarnings,
        hasInfos: raw.HasInfos,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawLogin = response.data
      const result: Types.Login = convertLogin(rawLogin)
      return { kind: "ok", login: result }
    } catch {
      console.log("error")
      return { kind: "bad-data" }
    }
  }

  /**
   *  register mobile information
   */
  async registerMobileInstances(
    payLoad: Types.MobileAppInstances,
  ): Promise<Types.GetMobileAppInstancesResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(
      `/TenantManagement/MobileAppInstances`,
      {
        ...payLoad,
      },
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok" }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   *  register mobile information
   */
  async updateMobileInstances(deviceToken
  ): Promise<Types.GetMobileAppInstancesResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.put(
      `/TenantManagement/MobileAppInstances?deviceToken=${deviceToken}`,
    )
    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok" }
    } catch {
      console.log("error")
      return { kind: "bad-data" }
    }
  }
}
