import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './query.component.html',
  styleUrl: './query.component.css',
})
export class QueryComponent implements OnInit {
  years: number[] = [];
  months: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];
  days: number[] = [];
  types: string[] = ['Alimentação', 'Educação', 'Lazer', 'Saúde', 'Transporte'];

  filterYear: number | null = null;
  filterMonth: string = '';
  filterDay: number | null = null;
  filterType: string = '';
  filterDescription: string = '';

  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let y = 2017; y <= currentYear; y++) {
      this.years.push(y);
    }
    this.updateDays();
    this.search();
  }

  updateDays(): void {
    let numDays = 31;

    if (this.filterMonth && this.filterYear) {
      const monthIndex = this.months.indexOf(this.filterMonth) + 1;
      numDays = new Date(this.filterYear, monthIndex, 0).getDate();
    }

    this.days = [];
    for (let d = 1; d <= numDays; d++) {
      this.days.push(d);
    }

    if (this.filterDay && this.filterDay > numDays) {
      this.filterDay = null;
    }
  }

  search(): void {
    const filter: Partial<Expense> = {};

    if (this.filterYear) filter.year = this.filterYear;
    if (this.filterMonth) filter.month = this.filterMonth;
    if (this.filterDay) filter.day = this.filterDay;
    if (this.filterType) filter.type = this.filterType;
    if (this.filterDescription) filter.description = this.filterDescription;

    this.expenses = this.expenseService.list(
      Object.keys(filter).length > 0 ? filter : undefined,
    );
  }

  delete(id: number | undefined): void {
    if (id === undefined) return;

    if (confirm('Deseja realmente excluir esta despesa?')) {
      this.expenseService.delete(id);
      this.search();
    }
  }

  get totalValue(): number {
    return this.expenses.reduce((sum, e) => sum + Number(e.value), 0);
  }

  clearFilters(): void {
    this.filterYear = null;
    this.filterMonth = '';
    this.filterDay = null;
    this.filterType = '';
    this.filterDescription = '';
    this.search();
  }
}
