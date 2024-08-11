import { computed, effect, Injectable, Signal, signal } from '@angular/core';
import { Goal } from '../models/goal.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  goals;

  private readonly localStorageKey = 'st-goals';

  constructor(private localStorageService: LocalStorageService) {
    this.goals = signal<Goal[]>(this.getGoals());
    effect(() => {
      this.saveGoals();
    });
  }

  addGoal(goal: Partial<Goal>): void {
    const newGoal = {
      savedAmount: 0,
      ...goal,
      id: (this.goals()[0]?.id || 0) + 1,
    } as Goal;

    this.goals.update((goals) => [newGoal, ...goals]);
  }

  getGoal(id: number): Signal<Goal | undefined> {
    return computed(() => this.goals().find((goal) => goal.id === id));
  }

  deleteGoal(id: number): void {
    this.goals.update((goals) => goals.filter((goal) => goal.id !== id));
  }

  updateGoal(id: number, newData: Goal): void {
    this.goals.update((goals) =>
      goals.map((goal) =>
        goal.id !== id
          ? goal
          : {
              ...goal,
              ...newData,
              id,
            }
      )
    );
  }

  private getGoals(): Goal[] {
    const goalsFromLS: Goal[] =
      this.localStorageService.getFromLocalStorage(this.localStorageKey) || [];

    return goalsFromLS.map((goal) => ({
      ...goal,
      savingStartDate: goal.savingStartDate
        ? new Date(goal.savingStartDate)
        : new Date(),
      dueDate: goal.dueDate ? new Date(goal.dueDate) : undefined,
    }));
  }

  private saveGoals(): void {
    this.localStorageService.saveToLocalStorage(
      this.localStorageKey,
      this.goals()
    );
  }
}
