import { Avatar, Box } from "@mui/material";

type DetailsCardProps = {
  name: string;
  bio: string;
  from: string;
  imgSrc?: string;
  loading: boolean;
};

const loadingFallBack = (item: string, loading: boolean): string => {
  if (loading) return "...";
  return item;
};

const DetailsCard = ({ name, bio, from, loading }: DetailsCardProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Avatar sx={{ height: "120px", width: "120px", maxWidth: "100%" }}>
        {loadingFallBack(name, loading)}
      </Avatar>
      <Box
        sx={{
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "10px",
          gap: "2px",
        }}
      >
        <Box
          component="span"
          sx={{ fontSize: "1.4rem", maxWidth: "50ch", fontWeight: "bold" }}
        >
          {loadingFallBack(name, loading)}
        </Box>
        <Box component="span" sx={{ fontSize: "1rem", maxWidth: "50ch" }}>
          {loadingFallBack(from, loading)}
        </Box>
        <Box component="span" sx={{ fontSize: "1rem", maxWidth: "50ch" }}>
          {loadingFallBack(bio, loading)}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsCard;
