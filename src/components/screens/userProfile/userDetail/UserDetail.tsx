import styles from "./styles.module.css";

type UserDetailPropsType = {
  name: string;
  value: number | string;
};
export default function UserDetail({ name, value }: UserDetailPropsType) {
  return (
    <div className={styles.detailWrapper}>
      <div className={styles.name}>
        <i>{name}</i>
      </div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
