import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

type SubmitButtonPropsType = {
  handleSubmit: () => boolean | Promise<boolean>;
  successMessage: string;
  name: string;
};

export default function SubmitButton({
  handleSubmit,
  successMessage,
  name,
}: SubmitButtonPropsType) {
  const router = useRouter();

  return (
    <Button
      size="medium"
      variant="contained"
      // className={styles.button}
      onClick={async () => {
        const success = await handleSubmit();
        if (success) {
          alert(successMessage);
          router.push("/");
        }
      }}
    >
      {name}
    </Button>
  );
}
