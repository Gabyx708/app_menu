export function getMondayFromDate(currentDate: Date): string {
    const dayOfWeek = currentDate.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const mondayDate = new Date(currentDate);
    mondayDate.setDate(currentDate.getDate() - daysToMonday);
    return mondayDate.toISOString();
  }