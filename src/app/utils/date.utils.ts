export function formatDateToMonthYear(date: Date): string {
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);
  return `${month}-${year}`;
}

export function getNextMonthsLabels(n: number): string[] {
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const labels: string[] = [];
  const currentDate = new Date();

  for (let i = 0; i < n; i++) {
    const monthIndex = (currentDate.getMonth() + i) % 12;
    const year = (
      currentDate.getFullYear() + Math.floor((currentDate.getMonth() + i) / 12)
    )
      .toString()
      .slice(-2);
    labels.push(`${months[monthIndex]}-${year}`);
  }

  return labels;
}

export function getMonthDifference(startDate: Date, endDate: Date): number {
  const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
  const monthsDifference = endDate.getMonth() - startDate.getMonth();
  return yearsDifference * 12 + monthsDifference;
}
