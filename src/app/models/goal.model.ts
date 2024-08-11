export interface Goal {
  id: number;
  title: string;
  targetAmount: number;
  savedAmount: number;
  dueDate: Date | undefined;
  savingStartDate: Date;
  imageUrl: string;
}
