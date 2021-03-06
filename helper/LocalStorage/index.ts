import AsyncStorage from '@react-native-community/async-storage';

export class LocalStorageHelper {
  static async setItem(key: string, value: string) {
    return AsyncStorage.setItem(key, value);
  }

  static async getItem(key: string) {
    return await AsyncStorage.getItem(key);
  }

  static async removeItem(key: string) {
    return await AsyncStorage.removeItem(key);
  }

  static async clear() {
    return await AsyncStorage.clear();
  }
}
