export function calculateSuccessRate(
  totalQuestions: number,
  correctAnswers: number
): number {
  // Проверка на нулевое количество вопросов, чтобы избежать деления на ноль
  if (totalQuestions === 0) {
    return 0;
  }

  // Вычисляем процент с округлением до двух знаков после запятой
  const percentage = (correctAnswers / totalQuestions) * 100;

  // Округляем до целого числа (по желанию можно изменить)
  return Math.round(percentage);
}
