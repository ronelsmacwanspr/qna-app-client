import { getUser } from "../utils";
import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_USER_ID, GET_LOGGED_IN_USER } from "../queries";

export const RedirectToLoginScreenIfUserAbsent = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const router = useRouter();

  // const {
  //   data: userData,
  //   loading: userLoading,
  //   error: userError,
  // } = useQuery(GET_USER_ID, { variables: { userId: 0 } });

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_LOGGED_IN_USER);

  console.log("user from server", userData);

  if (userLoading) {
    return <h2>Loading...</h2>;
  }

  if (userError) {
    return (
      <h2>
        Something went wrong! <i>{userError.message}</i>
      </h2>
    );
  }

  const { pathname } = router;
  const userId = userData?.loggedInUser?.id;
  console.log("userId", userId);
  if (userId >= 0) {
    console.log("pushin to router the feed page");
    if (pathname !== "/feed") router.push("/feed");
  } else if (pathname !== "/userLogin") router.push("/userLogin");

  return <div>{children}</div>;
};
