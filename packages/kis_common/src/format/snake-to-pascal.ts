export function snakeToPascal(snakeCase: string): string {
  return snakeCase.replace(/_./g, (match) => match.charAt(1).toUpperCase());
}