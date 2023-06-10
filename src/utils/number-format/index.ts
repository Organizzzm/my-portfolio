export function formatNumber(number: number): string {
  if (number % 1 === 0) {
    return parseFloat(number.toFixed(0)).toString(); // Если число целое, округляем до нуля знаков после запятой
  } else {
    return parseFloat(number.toFixed(1)).toString(); // Иначе, округляем до одного знака после запятой
  }
}
