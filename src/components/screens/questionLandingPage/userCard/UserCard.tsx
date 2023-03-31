import { Avatar, Card, CardHeader } from "@mui/material";

type UserCardProps = {
  imageDetails?: { src: string; alt: string };
  userName: string;
  datePosted: string;
};
const UserCard = ({ imageDetails, userName, datePosted }: UserCardProps) => {
  return (
    <Card
      sx={{
        backgroundColor: "transparent",
        borderWidth: "1px",
        borderStyle: "var(--root-border-style)",
        borderRadius: "var(--root-border-radius)",
        borderColor: "var(--root-border-color)",
      }}
    >
      <CardHeader
        avatar={<Avatar> {userName} </Avatar>}
        title={userName}
        subheader={datePosted}
      />
    </Card>
  );
};

export default UserCard;
