export const colors = ['#868686', '#84CEE4', '#82C492', '#C48289'];

export const pickRandomColor = () => {
  const color = colors[Math.floor(Math.random() * colors.length)];

  return color;
};

export const replaceOnColumn = <T>(arr: T[], i: number, j: number): T[] => {
  const copy = [...arr];
  const tmp = copy[i];

  copy[i] = copy[j];
  copy[j] = tmp;

  return copy;
};
