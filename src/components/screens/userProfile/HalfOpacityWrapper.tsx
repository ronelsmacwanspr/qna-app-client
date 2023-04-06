import { Box } from "@mui/material";
import { ReactNode } from "react";

const HalfOpacityWrapper = (props: {
  [x: string]: string | ReactNode;
  children: ReactNode;
}) => {
  const { children, ...rest } = props;
  return (
    <Box sx={{ opacity: "0.5" }} {...rest}>
      {children}
    </Box>
  );
};

export default HalfOpacityWrapper;
