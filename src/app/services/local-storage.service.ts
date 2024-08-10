import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * Save data to local storage.
   * @param key The key under which the data will be stored.
   * @param data The data to be stored, should be serializable.
   */
  saveToLocalStorage(key: string, data: any): void {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }

  /**
   * Get data from local storage.
   * @param key The key of the data to retrieve.
   * @returns The parsed data from local storage or null if the key doesn't exist or data is invalid.
   */
  getFromLocalStorage(key: string): any {
    try {
      const serializedData = localStorage.getItem(key);
      return serializedData ? JSON.parse(serializedData) : null;
    } catch (error) {
      console.error('Error getting data from local storage', error);
      return null;
    }
  }
}
