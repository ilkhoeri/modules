"use client";
import { useState, useCallback, useEffect } from "react";
import { useWindowEvent } from "./use-window-event";

export type StorageType = "localStorage" | "sessionStorage";

export interface StorageProperties<T> {
  key: string;
  defaultValue?: T;
  getInitialValueInEffect?: boolean;
  serialize?(value: T): string;
  deserialize?(value: string | undefined): T;
}

function serializeJSON<T>(value: T, hookName: string) {
  try {
    return JSON.stringify(value);
  } catch (error: any) {
    throw new Error(`${hookName}: Failed to serialize the value`, error);
  }
}

function deserializeJSON(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function createStorageHandler(type: StorageType) {
  const getItem = (key: string) => {
    try {
      return window[type].getItem(key);
    } catch (error) {
      console.warn(
        "use-local-storage: Failed to get value from storage, localStorage is blocked",
        error
      );
      return null;
    }
  };

  const setItem = (key: string, value: string) => {
    try {
      window[type].setItem(key, value);
    } catch (error: any) {
      console.warn(
        "use-local-storage: Failed to set value to storage, localStorage is blocked",
        error
      );
    }
  };

  const removeItem = (key: string) => {
    try {
      window[type].removeItem(key);
    } catch (error: any) {
      console.warn(
        "use-local-storage: Failed to remove value from storage, localStorage is blocked",
        error
      );
    }
  };

  return { getItem, setItem, removeItem };
}

export function createStorage<T>(type: StorageType, hookName: string) {
  const eventName =
    type === "localStorage" ? "oeri-local-storage" : "oeri-session-storage";
  const { getItem, setItem, removeItem } = createStorageHandler(type);

  return function useStorage({
    key,
    defaultValue = undefined,
    getInitialValueInEffect = true,
    deserialize = deserializeJSON,
    serialize = (value: T) => serializeJSON(value, hookName)
  }: StorageProperties<T>) {
    const readStorageValue = useCallback(
      (skipStorage?: boolean): T => {
        if (
          typeof window === "undefined" ||
          !(type in window) ||
          window[type] === null ||
          skipStorage
        ) {
          return defaultValue as T;
        }

        const storageValue = getItem(key);
        return storageValue !== null
          ? deserialize(storageValue)
          : (defaultValue as T);
      },
      [key, defaultValue, deserialize]
    );

    const [value, setValue] = useState<T>(
      readStorageValue(getInitialValueInEffect)
    );

    const setStorageValue = useCallback(
      (val: T | ((prevState: T) => T)) => {
        if (val instanceof Function) {
          setValue(current => {
            const result = val(current);
            setItem(key, serialize(result));
            window.dispatchEvent(
              new CustomEvent(eventName, {
                detail: { key, value: val(current) }
              })
            );
            return result;
          });
        } else {
          setItem(key, serialize(val));
          window.dispatchEvent(
            new CustomEvent(eventName, { detail: { key, value: val } })
          );
          setValue(val);
        }
      },
      [key, serialize]
    );

    const removeStorageValue = useCallback(() => {
      removeItem(key);
      window.dispatchEvent(
        new CustomEvent(eventName, { detail: { key, value: defaultValue } })
      );
    }, [defaultValue, key]);

    useWindowEvent("storage", event => {
      if (event.storageArea === window[type] && event.key === key) {
        setValue(deserialize(event.newValue ?? undefined));
      }
    });

    useWindowEvent(eventName, event => {
      if (event.detail.key === key) {
        setValue(event.detail.value);
      }
    });

    useEffect(() => {
      if (defaultValue !== undefined && value === undefined) {
        setStorageValue(defaultValue);
      }
    }, [defaultValue, value, setStorageValue]);

    useEffect(() => {
      if (getInitialValueInEffect) {
        setValue(readStorageValue());
      }
    }, [getInitialValueInEffect, readStorageValue]);

    return [
      value === undefined ? defaultValue : value,
      setStorageValue,
      removeStorageValue
    ] as const;
  };
}

export function useLocalStorage<T = string>(props: StorageProperties<T>) {
  return createStorage<T>("localStorage", "use-local-storage")(props);
}
