export const getTopicLabel = (count: number): string => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} тема`;
  }
  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 12 || count % 100 > 14)
  ) {
    return `${count} темы`;
  }
  return `${count} тем`;
};
