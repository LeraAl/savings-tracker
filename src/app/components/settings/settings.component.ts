import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

interface UserSettings {
  paymentDay: number;
  monthlyLimit: number;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  settings: UserSettings = {
    paymentDay: 1,
    monthlyLimit: 0,
  };

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    const storedSettings =
      this.localStorageService.getFromLocalStorage('userSettings');
    if (storedSettings) {
      this.settings = storedSettings;
    }
  }

  saveSettings(): void {
    this.localStorageService.saveToLocalStorage('userSettings', this.settings);
  }
}
