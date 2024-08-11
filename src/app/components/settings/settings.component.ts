import { Component, Signal } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  UserSettings,
  UserSettingsService,
} from '../../services/user-settings.service';

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
  settingsData: UserSettings;

  constructor(private settingsService: UserSettingsService) {
    this.settingsData = this.settingsService.settings();
  }

  saveSettings(): void {
    this.settingsService.saveSettings(this.settingsData);
  }
}
