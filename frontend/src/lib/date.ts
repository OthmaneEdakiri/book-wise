export const getDaysLeft = (dueDate: Date | null | undefined): number | null => {
  if (!dueDate) return null;

  const today = new Date();
  const due = new Date(dueDate);

  if (isNaN(due.getTime())) return null;

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  return Math.ceil((due.getTime() - today.getTime()) / MS_PER_DAY);
};
