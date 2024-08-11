import { ColumnType } from './enums';

export const columnColors: Record<ColumnType, string> = {
  [ColumnType.TO_DO]: '#868686',
  [ColumnType.IN_PROGRESS]: '#84CEE4',
  [ColumnType.COMPLETED]: '#82C492',
  [ColumnType.PAUSED]: '#868FE4',
  [ColumnType.BLOCKED]: '#C48289',
};

export const replaceOnColumn = <T>(arr: T[], i: number, j: number): T[] => {
  const copy = [...arr];
  const tmp = copy[i];

  copy[i] = copy[j];
  copy[j] = tmp;

  return copy;
};
