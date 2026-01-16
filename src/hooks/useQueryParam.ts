import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseQueryParamOptions<T> {
  /**
   * Default value to use when the query param is not present or invalid
   */
  defaultValue: T;
  /**
   * Optional function to validate the query param value
   * Returns true if valid, false otherwise
   */
  validate?: (value: string) => boolean;
  /**
   * Optional function to parse the query param value
   * Defaults to returning the value as-is (cast to T)
   */
  parse?: (value: string) => T;
  /**
   * Optional function to serialize the value to a string
   * Defaults to String(value)
   */
  serialize?: (value: T) => string;
}

type SetQueryParam<T> = (value: T | ((prev: T) => T)) => void;

/**
 * Generic hook for managing a single query parameter with type safety.
 *
 * @param key - The query parameter key
 * @param options - Configuration options including default value, validation, and serialization
 * @returns A tuple of [value, setValue] similar to useState
 *
 * @example
 * // Simple string enum
 * const [mode, setMode] = useQueryParam('mode', {
 *   defaultValue: ViewMode.EDIT,
 *   validate: (v) => Object.values(ViewMode).includes(v as ViewMode),
 * });
 *
 * @example
 * // Number parameter
 * const [page, setPage] = useQueryParam('page', {
 *   defaultValue: 1,
 *   parse: (v) => parseInt(v, 10),
 *   validate: (v) => !isNaN(parseInt(v, 10)),
 * });
 */
export function useQueryParam<T extends string | number | boolean>(
  key: string,
  options: UseQueryParamOptions<T>,
): [T, SetQueryParam<T>] {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    defaultValue, validate, parse, serialize,
  } = options;

  const value = useMemo((): T => {
    const rawValue = searchParams.get(key);

    if (rawValue === null) {
      return defaultValue;
    }

    // Validate if validation function is provided
    if (validate && !validate(rawValue)) {
      return defaultValue;
    }

    // Parse if parse function is provided, otherwise cast
    if (parse) {
      return parse(rawValue);
    }

    return rawValue as T;
  }, [searchParams, key, defaultValue, validate, parse]);

  const setValue: SetQueryParam<T> = useCallback(
    (newValue) => {
      setSearchParams((prev) => {
        const resolvedValue = typeof newValue === 'function'
          ? (newValue as (prev: T) => T)(value)
          : newValue;

        const serializedValue = serialize
          ? serialize(resolvedValue)
          : String(resolvedValue);

        const newParams = new URLSearchParams(prev);

        // Remove param if value equals default, otherwise set it
        if (resolvedValue === defaultValue) {
          newParams.delete(key);
        } else {
          newParams.set(key, serializedValue);
        }

        return newParams;
      }, { replace: true });
    },
    [setSearchParams, key, defaultValue, serialize, value],
  );

  return [value, setValue];
}

/**
 * Helper to create a validator for string enum values
 */
export function createEnumValidator<T extends Record<string, string>>(
  enumObj: T,
): (value: string) => boolean {
  const values = Object.values(enumObj);
  return (value: string) => values.includes(value);
}
