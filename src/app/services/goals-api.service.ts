import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root',
})
export class GoalsApiService {
  private apiUrl =
    'https://ux76gdws93.execute-api.eu-north-1.amazonaws.com/goals';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders();
    // return new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: 'Bearer YOUR_JWT_TOKEN', // Replace with actual token if needed
    // });
  }

  getGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getGoalById(id: string): Observable<Goal> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Goal>(url, { headers: this.getHeaders() });
  }

  createGoal(goal: Goal): Observable<Goal> {
    return this.http.put<Goal>(this.apiUrl, goal, {
      headers: this.getHeaders(),
    });
  }

  updateGoal(goal: Goal): Observable<Goal> {
    const url = `${this.apiUrl}`;
    return this.http.put<Goal>(url, goal, { headers: this.getHeaders() });
  }

  deleteGoal(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() });
  }
}
