type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean }

/**
 * Combines multiple class values into a single string, handling objects where keys are class names
 * and values determine if they should be included.
 *
 * Example:
 * cn('base-class', { 'conditional-class': true, 'another-class': false }, 'always-included')
 * // returns: 'base-class conditional-class always-included'
 */
export function cn(...classes: ClassValue[]): string {
  return classes
    .flatMap((cls) => {
      if (!cls) return []

      if (typeof cls === "string" || typeof cls === "number") {
        return String(cls)
      }

      if (typeof cls === "object") {
        return Object.entries(cls)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
      }

      return []
    })
    .filter(Boolean)
    .join(" ")
}
