import { Component, Signal } from '@angular/core';
import { Goal } from '../../models/goal.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GoalsService } from '../../services/goals.service';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddGoalDialogComponent } from '../add-goal-dialog/add-goal-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-goal-details',
  standalone: true,
  imports: [
    MatCardModule,
    CurrencyPipe,
    DatePipe,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './goal-details.component.html',
  styleUrl: './goal-details.component.scss',
})
export class GoalDetailsComponent {
  goal!: Signal<Goal>;

  // Properties to control input visibility and store amounts
  showDepositInput = false;
  showWithdrawInput = false;
  depositAmount: number | undefined;
  withdrawAmount: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private goalsService: GoalsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const goalId = Number(this.route.snapshot.paramMap.get('id'));
    const goal = this.goalsService.getGoal(goalId);

    if (!goal()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.goal = goal as Signal<Goal>;
    }
  }

  deleteGoal() {
    this.goalsService.deleteGoal(this.goal().id);
    this.router.navigate(['/dashboard']);
  }

  editGoal(): void {
    const dialogRef = this.dialog.open(AddGoalDialogComponent, {
      width: '500px',
      data: { goal: this.goal() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.goalsService.updateGoal(this.goal().id, result);
      }
    });
  }

  confirmDeposit(): void {
    if (this.depositAmount && this.depositAmount > 0) {
      const goal = this.goal();
      this.goalsService.updateGoal(goal.id, {
        ...goal,
        savedAmount: goal.savedAmount + this.depositAmount,
      });
      this.depositAmount = undefined;
      this.showDepositInput = false;
    }
  }

  confirmWithdraw(): void {
    if (this.withdrawAmount && this.withdrawAmount > 0) {
      const goal = this.goal();
      this.goalsService.updateGoal(goal.id, {
        ...goal,
        savedAmount: goal.savedAmount - this.withdrawAmount,
      });
      this.withdrawAmount = undefined;
      this.showWithdrawInput = false;
    }
  }

  cancelDeposit() {
    this.depositAmount = undefined;
    this.showDepositInput = false;
  }

  cancelWithdraw() {
    this.withdrawAmount = undefined;
    this.showWithdrawInput = false;
  }
}
