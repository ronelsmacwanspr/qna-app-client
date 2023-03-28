import UserDetail from "./userDetail";
import Contribution from "./userDetail/contribution";
import { useState } from "react";

import styles from "./styles.module.css";
import { useEffect } from "react";
import { getUser } from "../../../utils";

import { USER_PROFILE_FIELDS, UserKeys } from "../../../constants";

export default function UserProfile() {
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  let user = getUser();
  console.log("in profile page user is ", user);

  if (!user) {
    return null;
  }

  let render: JSX.Element[] = [];
  for (let _key of USER_PROFILE_FIELDS.inputKeys) {
    render.push(
      <UserDetail
        key={_key}
        name={USER_PROFILE_FIELDS.keysLabel[_key]}
        value={user[_key] as number | string}
      />
    );
  }

  render.splice(
    1,
    0,
    <UserDetail
      key={UserKeys.id}
      name={USER_PROFILE_FIELDS.keysLabel[UserKeys.id]}
      value={user.id}
    />
  );

  if (!user) {
    return null;
  }

  return (
    <main>
      <div className={styles.wrapper}>
        <img className={styles.icon} src="/user.png" alt="User icon" />

        <div className={styles.userDetails}>
          {render}

          <Contribution type={UserKeys.questions} />

          <Contribution type={UserKeys.answers} />
        </div>
      </div>
    </main>
  );
}
