export const colors = ['#868686', '#84CEE4', '#82C492', '#C48289'];

export const pickRandomColor = () => {
  const color = colors[Math.floor(Math.random() * colors.length)];

  return color;
};
