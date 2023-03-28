import { useEffect, useMemo } from "react";
import { Updater, useImmer } from "use-immer";

type serializerType<Type> = (arg0: Type) => string;

type deserializerType<Type> = (arg0: string) => Type;

const getFromLocalStorage = <Type>(
  key: string,
  deserializer: deserializerType<Type>
): null | Type => {
  if (typeof window === "undefined") return null;

  let value = null;
  try {
    value = deserializer(localStorage.getItem(key) as string);
    return value;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const setInLocalStorage = <Type>(
  key: string,
  value: Type,
  serializer: serializerType<Type>
): null => {
  if (typeof window === "undefined") return null;

  try {
    const str = serializer(value);
    localStorage.setItem(key, str);
  } catch (err) {
    console.error(err);
  }
  return null;
};

const useLocalStorage = <Type>(
  key: string,
  initialValue: Type,
  serializer: serializerType<Type> = JSON.stringify,
  deserializer: deserializerType<Type> = JSON.parse
) => {
  const [state, setState] = useImmer<Type>(() => {
    const val = getFromLocalStorage(key, deserializer);
    return val ? val : initialValue;
  });

  useEffect(() => {
    if (state) {
      console.log("setting in effect-2 local storage as", state);
      setInLocalStorage(key, state, serializer);
    }
  }, [key, state]);

  const value: [Type, Updater<Type>] = useMemo(
    () => [state, setState],
    [state]
  );

  return value;
};

export { useLocalStorage, setInLocalStorage, getFromLocalStorage };
