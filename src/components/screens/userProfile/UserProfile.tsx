import { GET_LOGGEDIN_USER_PROFILE_FIELDS } from "../../../queries";
import { useQuery } from "@apollo/client";
import DetailsCard from "./detailsCard";
import { Box } from "@mui/material";
import Link from "next/link";
import QnAContribution from "./QnAContribution";
import HomeButton from "../../homeButton";

const UserProfile = () => {
  const {
    data: userData,
    loading: userLoading,
    error: userFetchingError,
  } = useQuery(GET_LOGGEDIN_USER_PROFILE_FIELDS);

  const user = userData?.loggedInUser;

  if (userFetchingError) {
    return <p>Something went wrong! {userFetchingError.message}</p>;
  }

  console.log("user in profile page", user);

  return (
    <Box>
      <Box
        component="header"
        sx={{ marginBottom: "12px", paddingLeft: "24px", paddingTop: "24px" }}
      >
        {" "}
        <HomeButton />
      </Box>
      <Box sx={{ padding: "24px" }}>
        <Box component="section" sx={{ display: "flex", gap: "12px" }}>
          <Box
            sx={{
              flexGrow: "0.8",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <DetailsCard
              name={user?.name}
              bio={user?.bio}
              from={user?.from}
              loading={userLoading}
            />

            <QnAContribution user={user} loading={userLoading} />
          </Box>
          <Box
            component="aside"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontSize: "1.4rem",
            }}
          >
            <Link href="/askQuestion">
              <Box component="span"> Post Question</Box>
            </Link>

            <Link href="/answer">
              {" "}
              <Box component="span"> Post Answer</Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
