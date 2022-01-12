// Use this import if you want to use "env.js" file
const { API_URL, TIME_OUT } = require("../../config/env")()
console.log("API", API_URL)

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * The Url of Monitoring Api
   */
  monitoringApiUrl: string

  /**
   * the URL of LoggingApi
   */
  loggingApiUrl: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  monitoringApiUrl: "",
  loggingApiUrl: "",
  timeout: TIME_OUT,
}
