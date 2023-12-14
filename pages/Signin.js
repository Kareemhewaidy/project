import { useSession, signIn, signOut } from "next-auth/react";
import Styles from "@/styles/Form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Signin() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Welcome, {session.user.name}</p>
        Signed in as {session.user.email} <br />
        <button className={Styles.button} onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      <h1>Sign In</h1>
      <form className={Styles.form}>
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input type="text" placeholder="Enter Email" required className={Styles.input} />

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input type="password" placeholder="Enter Password" required className={Styles.input} />

        <button className={Styles.button} onClick={() => signIn()}>
          Sign in
        </button>
        <button className={Styles.button} onClick={() => signIn()}>
          Sign in With GitHub
        </button>
      </form>
    </>
  );
}















