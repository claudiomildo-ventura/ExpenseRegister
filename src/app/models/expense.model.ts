export interface Expense {
  id?: number;
  year: number;
  month: string;
  day: number;
  type: string;
  description: string;
  value: number;
}
