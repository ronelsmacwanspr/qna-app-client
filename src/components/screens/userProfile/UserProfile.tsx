import { GET_LOGGEDIN_USER_PROFILE_FIELDS } from "../../../queries";
import { useQuery } from "@apollo/client";
import DetailsCard from "./detailsCard";
import { Box, Button } from "@mui/material";
import QnAContribution from "./QnAContribution";
import HomeButton from "../../homeButton";
import { useRouter } from "next/router";

const UserProfile = () => {
  const router = useRouter();
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

  const handleLogout = () => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem("token_id");
    router.push("/userLogin");
  };

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
            <Button
              variant="outlined"
              onClick={() => router.push("/askQuestion")}
            >
              Post Question
            </Button>

            <Button variant="outlined" onClick={() => router.push("/answer")}>
              Post Answer
            </Button>

            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
