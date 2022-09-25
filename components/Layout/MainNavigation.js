import Link from "next/link";
import styles from "./MainNavigation.module.css";
import { Fragment } from "react";
import { useSession, signOut } from "next-auth/react";

const MainNavigation = () => {
  const { data: session } = useSession();

  return (
    <Fragment>
      {session && (
        <header className={styles.header}>
          <Link href="/">
            <a className={styles.logo}>
              <h1>Groove Invoice</h1>
            </a>
          </Link>
          <nav>
            {session && (
              <ul className={styles.menu}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <a onClick={() => signOut()}>SignOut</a>
                </li>
              </ul>
            )}
          </nav>
        </header>
      )}
    </Fragment>
  );
};

export default MainNavigation;
