export default class LocalStorageService {
  constructor() {}

  getItem(key: string): string {
    console.log(`Getting ${key} to localstorage`);
    return localStorage.getItem(key) || "";
  }

  setItem(key: string, value: string): void {
    console.log(`Setting ${key} to localstorage`, value)
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
