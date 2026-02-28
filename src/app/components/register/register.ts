import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  private readonly expenseService = inject(ExpenseService);
  private readonly router = inject(Router);

  protected readonly years = signal<number[]>([]);
  protected readonly months = signal<string[]>([
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ]);
  protected readonly days = signal<number[]>([]);
  protected readonly types = signal<string[]>([
    'Alimentação', 'Educação', 'Lazer', 'Saúde', 'Transporte',
  ]);

  protected selectedYear = signal<number | null>(null);
  protected selectedMonth = signal<string>('');
  protected selectedDay = signal<number | null>(null);
  protected selectedType = signal<string>('');
  protected description = signal<string>('');
  protected value = signal<number | null>(null);

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    const yrs: number[] = [];
    for (let y = 2017; y <= currentYear; y++) {
      yrs.push(y);
    }
    this.years.set(yrs);
    this.updateDays();
  }

  protected updateDays(): void {
    let numDays = 31;
    const month = this.selectedMonth();
    const year = this.selectedYear();

    if (month && year) {
      const monthIndex = this.months().indexOf(month) + 1;
      numDays = new Date(year, monthIndex, 0).getDate();
    }

    const d: number[] = [];
    for (let i = 1; i <= numDays; i++) {
      d.push(i);
    }
    this.days.set(d);

    const currentDay = this.selectedDay();
    if (currentDay && currentDay > numDays) {
      this.selectedDay.set(null);
    }
  }

  protected register(): void {
    if (
      !this.selectedYear() ||
      !this.selectedMonth() ||
      !this.selectedDay() ||
      !this.selectedType() ||
      !this.description() ||
      !this.value()
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      this.expenseService.register({
        year: this.selectedYear()!,
        month: this.selectedMonth(),
        day: this.selectedDay()!,
        type: this.selectedType(),
        description: this.description(),
        value: this.value()!,
      });

      this.router.navigate(['/query']);
    } catch (error) {
      alert(`Erro ao cadastrar novo serviço.\n\n${error}`);
    }
  }
}
