export default class LocalStorageService {
  constructor() {}

  getItem(key: string): string {
    return localStorage.getItem(key) || "";
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
