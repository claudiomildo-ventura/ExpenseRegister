import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  years: number[] = [];
  months: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];
  days: number[] = [];
  types: string[] = ['Alimentação', 'Educação', 'Lazer', 'Saúde', 'Transporte'];

  selectedYear: number | null = null;
  selectedMonth: string = '';
  selectedDay: number | null = null;
  selectedType: string = '';
  description: string = '';
  value: number | null = null;

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let y = 2017; y <= currentYear; y++) {
      this.years.push(y);
    }
    this.updateDays();
  }

  updateDays(): void {
    let numDays = 31;

    if (this.selectedMonth && this.selectedYear) {
      const monthIndex = this.months.indexOf(this.selectedMonth) + 1;
      numDays = new Date(this.selectedYear, monthIndex, 0).getDate();
    }

    this.days = [];
    for (let d = 1; d <= numDays; d++) {
      this.days.push(d);
    }

    if (this.selectedDay && this.selectedDay > numDays) {
      this.selectedDay = null;
    }
  }

  register(): void {
    if (
      !this.selectedYear ||
      !this.selectedMonth ||
      !this.selectedDay ||
      !this.selectedType ||
      !this.description ||
      !this.value
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      this.expenseService.register({
        year: this.selectedYear,
        month: this.selectedMonth,
        day: this.selectedDay,
        type: this.selectedType,
        description: this.description,
        value: this.value,
      });

      this.router.navigate(['/query']);
    } catch (error) {
      alert(`Erro ao cadastrar novo serviço.\n\n${error}`);
    }
  }
}
