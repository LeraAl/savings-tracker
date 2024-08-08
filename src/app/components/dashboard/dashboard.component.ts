import { Component, Signal } from '@angular/core';
import { GoalCardComponent } from '../goal-card/goal-card.component';
import { Goal } from '../../models/goal.model';
import { CommonModule } from '@angular/common';
import { GoalsService } from '../../services/goals.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GoalCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  goals: Signal<Goal[]>;

  constructor(private goalsService: GoalsService) {
    this.goals = this.goalsService.goals;
  }
}
