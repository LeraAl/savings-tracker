import { Injectable, signal } from '@angular/core';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  goals = signal<Goal[]>([
    {
      id: 1,
      title: 'Vacation Fund',
      targetAmount: 1000,
      savedAmount: 100,
      dueDate: new Date('2024-12-31'),
      savingStartDate: new Date('2024-01-01'),
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
    {
      id: 2,
      title: 'Emergency Fund',
      targetAmount: 5000,
      savedAmount: 1200,
      dueDate: new Date('2025-12-31'),
      savingStartDate: new Date('2024-06-01'),
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
    {
      id: 1,
      title: 'Vacation Fund',
      targetAmount: 1000,
      savedAmount: 100,
      dueDate: new Date('2024-12-31'),
      savingStartDate: new Date('2024-01-01'),
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
    {
      id: 2,
      title: 'Emergency Fund',
      targetAmount: 5000,
      savedAmount: 1200,
      dueDate: new Date('2025-12-31'),
      savingStartDate: new Date('2024-06-01'),
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
    {
      id: 1,
      title: 'Vacation Fund',
      targetAmount: 1000,
      savedAmount: 100,
      dueDate: new Date('2024-12-31'),
      savingStartDate: new Date('2024-01-01'),
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
    {
      id: 2,
      title: 'Emergency Fund',
      targetAmount: 5000,
      savedAmount: 1200,
      dueDate: new Date('2025-12-31'),
      savingStartDate: new Date('2024-06-01'),
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
    {
      id: 1,
      title: 'Vacation Fund',
      targetAmount: 1000,
      savedAmount: 100,
      dueDate: new Date('2024-12-31'),
      savingStartDate: new Date('2024-01-01'),
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
    {
      id: 2,
      title: 'Emergency Fund',
      targetAmount: 5000,
      savedAmount: 1200,
      dueDate: new Date('2025-12-31'),
      savingStartDate: new Date('2024-06-01'),
      imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
  ]);
  constructor() {}

  addGoal(goal: Goal): void {
    this.goals.update((goals) => [goal, ...goals]);
  }
}
