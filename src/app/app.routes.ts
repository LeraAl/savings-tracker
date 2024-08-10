import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoalDetailsComponent } from './components/goal-details/goal-details.component';
import { GoalsStatisticsComponent } from './components/goals-statistics/goals-statistics.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'goal/:id', component: GoalDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'statistics', component: GoalsStatisticsComponent },
];
