const production = require("./production")
const development = require("./development")
const local = require("./local")
const storage = require("../utils/storage")

module.exports = () => {
  const defEnv = storage.loadStringSync("dev-env")
  if (!defEnv) {
    return __DEV__ ? development : production
  }
  switch (defEnv) {
    case "production":
      return production
    case "development":
      return development
    case "local":
      return local
  }
  return production
}
