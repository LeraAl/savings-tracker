export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  dueDate: Date | undefined;
  savingStartDate: Date;
  imageUrl: string;
}
