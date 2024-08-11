import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

export interface UserSettings {
  paymentDay: number;
  monthlyLimit: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private readonly storageKey = 'st-user-settings';
  private readonly defaultSettings: UserSettings = {
    paymentDay: 1,
    monthlyLimit: null,
  };

  settings = signal(structuredClone(this.defaultSettings));

  constructor(private localStorageService: LocalStorageService) {
    this.loadSettings();
  }

  loadSettings(): void {
    const storedSettings = this.localStorageService.getFromLocalStorage(
      this.storageKey
    );
    if (storedSettings) {
      this.settings.update(() => storedSettings);
    }
  }

  saveSettings(settings: UserSettings): void {
    this.settings.update(() => settings);
    this.localStorageService.saveToLocalStorage(this.storageKey, settings);
  }
}
