import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly STORAGE_KEY = 'id';

  register(expense: Expense): boolean {
    const nextId = this.nextPrimaryKey();
    localStorage.setItem(this.STORAGE_KEY, String(nextId));
    localStorage.setItem(String(nextId), JSON.stringify(expense));
    return true;
  }

  list(filter?: Partial<Expense>): Expense[] {
    const expenses: Expense[] = [];
    const totalId = localStorage.getItem(this.STORAGE_KEY);

    if (totalId === null) {
      return expenses;
    }

    const total = parseInt(totalId, 10);

    for (let i = 1; i <= total; i++) {
      const raw = localStorage.getItem(String(i));
      if (raw) {
        const expense: Expense = JSON.parse(raw);
        expense.id = i;

        if (this.matchesFilter(expense, filter)) {
          expenses.push(expense);
        }
      }
    }

    return expenses;
  }

  delete(id: number): void {
    localStorage.removeItem(String(id));
  }

  private matchesFilter(expense: Expense, filter?: Partial<Expense>): boolean {
    if (!filter) {
      return true;
    }

    if (filter.year && expense.year !== filter.year) {
      return false;
    }
    if (filter.month && expense.month !== filter.month) {
      return false;
    }
    if (filter.day && expense.day !== filter.day) {
      return false;
    }
    if (filter.type && expense.type !== filter.type) {
      return false;
    }
    if (filter.description && !expense.description.toLowerCase().includes(filter.description.toLowerCase())) {
      return false;
    }

    return true;
  }

  private nextPrimaryKey(): number {
    const raw = localStorage.getItem(this.STORAGE_KEY);

    if (raw === null || raw === undefined) {
      localStorage.setItem(this.STORAGE_KEY, '0');
      return 1;
    }

    return parseInt(raw, 10) + 1;
  }
}
