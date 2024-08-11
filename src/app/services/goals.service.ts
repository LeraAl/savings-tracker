import { computed, Injectable, Signal, signal } from '@angular/core';
import { Goal } from '../models/goal.model';
import { getUniqueId } from '../utils/uuid.utils';
import { GoalsApiService } from './goals-api.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  goals = signal<Goal[]>([]);

  constructor(private apiService: GoalsApiService) {
    this.getGoals().subscribe();
  }

  addGoal(goal: Partial<Goal>): void {
    const newGoal = {
      savedAmount: 0,
      ...goal,
      id: getUniqueId(),
    } as Goal;

    this.apiService.createGoal(newGoal).subscribe(() => {
      this.goals.update((goals) => [newGoal, ...goals]);
    });
  }

  getGoal(id: string): Signal<Goal | undefined> {
    return computed(() => this.goals().find((goal) => goal.id === id));
  }

  deleteGoal(id: string): void {
    this.apiService.deleteGoal(id).subscribe(() => {
      this.goals.update((goals) => goals.filter((goal) => goal.id !== id));
    });
  }

  updateGoal(id: string, newData: Goal): void {
    const goalToUpdate = this.goals().find((goal) => goal.id === id);

    if (!goalToUpdate) {
      throw new Error(`goal not found. id: ${id}`);
    }

    const updatedGoal = {
      ...goalToUpdate,
      ...newData,
      id,
    };

    this.apiService.updateGoal(updatedGoal).subscribe(() => {
      this.goals.update((goals) =>
        goals.map((goal) => (goal.id !== id ? goal : updatedGoal))
      );
    });
  }

  private getGoals(): Observable<Goal[]> {
    return this.apiService.getGoals().pipe(
      map((goals) =>
        goals.map((goal) => ({
          ...goal,
          savingStartDate: goal.savingStartDate
            ? new Date(goal.savingStartDate)
            : new Date(),
          dueDate: goal.dueDate ? new Date(goal.dueDate) : undefined,
        }))
      ),
      tap((goals) => this.goals.set(goals))
    );
  }
}
