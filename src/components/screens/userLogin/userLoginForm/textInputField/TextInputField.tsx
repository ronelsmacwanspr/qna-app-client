import { ChangeEvent } from "react";
import styles from "./styles.module.css";

type TextInputFieldPropsType = {
  _key: string;
  label: string;
  placeholder: string;
  type?: string;
  handleChange: (arg0: string, arg1: ChangeEvent<HTMLInputElement>) => void;
};

const TextInputField = ({
  _key,
  label,
  placeholder,
  type = "input",
  handleChange,
}: TextInputFieldPropsType) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={_key}>
        {" "}
        {label}
      </label>

      <input
        className={styles.input}
        id={_key}
        type={type}
        placeholder={placeholder}
        onChange={(event) => handleChange(_key, event)}
      />
    </div>
  );
};

export { TextInputField };
