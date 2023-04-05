import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
    <Box>
      <Button
        size="medium"
        variant="contained"
        onClick={async (e) => {
          const res = await handleSubmit();
          if (res) {
            alert(successMessage);
            router.push("/feed");
          }
        }}
      >
        {name}
      </Button>
    </Box>
  );
}
