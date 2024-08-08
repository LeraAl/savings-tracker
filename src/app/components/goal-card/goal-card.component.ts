import { Component, Input } from '@angular/core';
import { Goal } from '../../models/goal.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-goal-card',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, MatCardModule],
  templateUrl: './goal-card.component.html',
  styleUrl: './goal-card.component.scss',
})
export class GoalCardComponent {
  @Input() goal!: Goal;

  get progressPercentage(): number {
    return (this.goal.savedAmount / this.goal.targetAmount) * 100;
  }
}
