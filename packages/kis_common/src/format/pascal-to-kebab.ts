export function pascalToKebab(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Insert underscore between lowercase and uppercase letters
    .toLowerCase() // Convert the string to lowercase
    .replace(/_/g, '-'); // Replace underscores with hyphens
}
