import { Component, EventEmitter, Output, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddGoalDialogComponent } from '../add-goal-dialog/add-goal-dialog.component';
import { Goal } from '../../models/goal.model';
import { GoalsService } from '../../services/goals.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLoggedIn: Signal<boolean>;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private goalsService: GoalsService
  ) {
    this.isLoggedIn = this.auth.isLoggedIn;
  }

  logout() {
    this.auth.logout();
  }

  addGoal() {
    const dialogRef = this.dialog.open(AddGoalDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the result, e.g., save the new goal to localStorage
        console.log('New goal:', result);
        // Add logic to save the new goal
        this.goalsService.addGoal(result);
      }
    });
  }
}
