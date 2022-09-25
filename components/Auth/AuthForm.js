import styles from "./AuthForm.module.css";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { createUser } from "../../lib/user-util";
import { signIn } from "next-auth/react";
const AuthForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const [errorMessage, setErrorMessage] = useState();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    setErrorMessage(null);
  }
  const submitHandler = async (event) => {
    event.preventDefault();

    const password = passwordInputRef.current.value;
    const email = emailInputRef.current.value;

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (!result.error) {
        router.replace("/");
      } else {
        setErrorMessage(result.error);
      }
    } else {
      const name = nameInputRef.current.value;
      try {
        const result = await createUser(email, password, name);
        setIsLogin(true);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };
  return (
    <section className={styles.form}>
      <div className={styles.controls}>
        <h1>{isLogin ? "Sign In to Groove Invoice" : "Create your account"}</h1>
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <div className={styles.control}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" required ref={nameInputRef} />
            </div>
          )}
          <div className={styles.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          {errorMessage && <div className={styles.invalid}>{errorMessage}</div>}
          <div className={styles.actions}>
            <button>{isLogin ? "Login" : "Create Account"}</button>
            <button
              type="button"
              className={styles.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Already have an account?"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
