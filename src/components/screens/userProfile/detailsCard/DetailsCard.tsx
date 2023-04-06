import { Avatar, Box } from "@mui/material";
import HalfOpacityWrapper from "../HalfOpacityWrapper";

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
        {loading ? "User.." : name}
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
          {loading ? (
            <HalfOpacityWrapper component="span">Name...</HalfOpacityWrapper>
          ) : (
            name
          )}
        </Box>
        <Box component="span" sx={{ fontSize: "1rem", maxWidth: "50ch" }}>
          {loading ? (
            <HalfOpacityWrapper component="span">From...</HalfOpacityWrapper>
          ) : (
            from
          )}
        </Box>
        <Box component="span" sx={{ fontSize: "1rem", maxWidth: "50ch" }}>
          {loading ? (
            <HalfOpacityWrapper component="span">Bio...</HalfOpacityWrapper>
          ) : (
            bio
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsCard;
