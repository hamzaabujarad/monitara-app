import MMKVStorage from "react-native-mmkv-storage"

const MMKV = new MMKVStorage.Loader().withInstanceID("__monitara").initialize()

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return await MMKV.getStringAsync(key)
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await MMKV.setStringAsync(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string): Promise<any | null> {
  try {
    const almostThere = await MMKV.getStringAsync(key)
    return JSON.parse(almostThere)
  } catch {
    return null
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: any): Promise<boolean> {
  try {
    await MMKV.setStringAsync(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}
/**
 * Loads a string from storage (Async).
 *
 * @param key The key to fetch.
 */
export function loadStringSync(key: string): string {
  try {
    return MMKV.getString(key)
  } catch {
    return ""
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export function remove(key: string): void {
  try {
    MMKV.removeItem(key)
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export function clear(): void {
  try {
    MMKV.clearStore()
  } catch {}
}
