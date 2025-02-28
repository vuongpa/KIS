export function pascalToSnake(pascalCase: string): string {
  return pascalCase.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}