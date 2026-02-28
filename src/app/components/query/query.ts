import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-query',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './query.html',
  styleUrl: './query.css',
})
export class Query implements OnInit {
  private readonly expenseService = inject(ExpenseService);

  protected readonly years = signal<number[]>([]);
  protected readonly months = signal<string[]>([
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ]);
  protected readonly days = signal<number[]>([]);
  protected readonly types = signal<string[]>([
    'Alimentação', 'Educação', 'Lazer', 'Saúde', 'Transporte',
  ]);

  protected filterYear = signal<number | null>(null);
  protected filterMonth = signal<string>('');
  protected filterDay = signal<number | null>(null);
  protected filterType = signal<string>('');
  protected filterDescription = signal<string>('');

  protected readonly expenses = signal<Expense[]>([]);

  protected readonly totalValue = computed(() =>
    this.expenses().reduce((sum, e) => sum + Number(e.value), 0),
  );

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    const yrs: number[] = [];
    for (let y = 2017; y <= currentYear; y++) {
      yrs.push(y);
    }
    this.years.set(yrs);
    this.updateDays();
    this.search();
  }

  protected updateDays(): void {
    let numDays = 31;
    const month = this.filterMonth();
    const year = this.filterYear();

    if (month && year) {
      const monthIndex = this.months().indexOf(month) + 1;
      numDays = new Date(year, monthIndex, 0).getDate();
    }

    const d: number[] = [];
    for (let i = 1; i <= numDays; i++) {
      d.push(i);
    }
    this.days.set(d);

    const currentDay = this.filterDay();
    if (currentDay && currentDay > numDays) {
      this.filterDay.set(null);
    }
  }

  protected search(): void {
    const filter: Partial<Expense> = {};

    if (this.filterYear()) filter.year = this.filterYear()!;
    if (this.filterMonth()) filter.month = this.filterMonth();
    if (this.filterDay()) filter.day = this.filterDay()!;
    if (this.filterType()) filter.type = this.filterType();
    if (this.filterDescription()) filter.description = this.filterDescription();

    this.expenses.set(
      this.expenseService.list(Object.keys(filter).length > 0 ? filter : undefined),
    );
  }

  protected deleteExpense(id: number | undefined): void {
    if (id === undefined) return;

    if (confirm('Deseja realmente excluir esta despesa?')) {
      this.expenseService.delete(id);
      this.search();
    }
  }

  protected clearFilters(): void {
    this.filterYear.set(null);
    this.filterMonth.set('');
    this.filterDay.set(null);
    this.filterType.set('');
    this.filterDescription.set('');
    this.search();
  }
}
