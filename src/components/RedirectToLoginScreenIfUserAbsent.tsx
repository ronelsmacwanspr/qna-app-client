import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_LOGGED_IN_USER } from "../queries";

export const RedirectToLoginScreenIfUserAbsent = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const router = useRouter();

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_LOGGED_IN_USER);

  console.log("user from server", userData, "loading", userLoading);
  console.log("router-ready", router.isReady);

  const { pathname } = router;
  const userId = userData?.loggedInUser?.id;
  console.log("userId", userId);

  if (typeof userId !== "number" && !userLoading) {
    console.log("pushin to router the login page");
    if (pathname !== "/userLogin" && router.isReady) router.push("/userLogin");
  }

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

  return <div>{children}</div>;
};
