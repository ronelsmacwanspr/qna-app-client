import { useRouter } from "next/router";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type SubmitButtonPropsType = {
  handleSubmit: () => boolean | Promise<boolean>;
  successMessage: string;
  pendingMessage?: string;
  name: string;
  loading?: boolean;
};

export default function SubmitButton({
  handleSubmit,
  successMessage,
  name,
  loading = false,
  pendingMessage = "Please wait...",
}: SubmitButtonPropsType) {
  const router = useRouter();

  if (loading) {
    return (
      <Snackbar
        autoHideDuration={5000}
        open={true}
        sx={{ width: "100%", justifyContent: "center" }}
      >
        <Alert severity="info">{pendingMessage}</Alert>
      </Snackbar>
    );
  }

  return (
    <Box>
      <Button
        disabled={loading}
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
