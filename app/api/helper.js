import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Timer {
  constructor(func) {
    this.timer = null;
    this.func = func;
  }

  start() {
    if (!this.timer) {
      this.timer = setInterval(this.func, 1000);
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}

export const getData = async () => {
  try {
    const settings = await AsyncStorage.getItem('@pomodoro_dx_storage_Key');
    if (settings !== null) {
      // value previously stored
      return settings != null ? JSON.parse(settings) : null;
    }
  } catch (err) {
    // error reading value
    return err.message;
  }
  return false;
};

export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@pomodoro_dx_storage_Key', JSON.stringify(value));
  } catch (err) {
    // saving error
    return err.message;
  }
  return false;
};
