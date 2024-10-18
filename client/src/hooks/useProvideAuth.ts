import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type userType =
  | {
      username: string;
      authToken: string;
    }
  | {}
  | null;

type loginDataType = {
  username: string;
  password: string;
};

function useProvideAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState<userType | any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //later we add signin , signout , isLoading
  const signIn = async (loginData: loginDataType) => {
    console.log(
      `Trying to Login with Data =>  user : ${loginData.username} ,  password: ${loginData.password}`
    );

    let result: {
      username?: string;
      authToken?: string;
      status: string;
      error?: string;
    };
    try {
      //Moke add Fake User
      setIsLoading(true);
      result = await new Promise<void>((resolve, reject) => {
        console.log(`Logging in ...`);
        setTimeout(() => {
          if (loginData.username === "admin" && loginData.password === "admin")
            resolve();
          else reject();
        }, 5000);
      })
        .then(() => {
          console.log("Login Successful");
          return {
            status: "success",
            username: "test",
            authToken: "ej6df45sex0xo",
          };
        })
        .catch(() => {
          throw new Error("Login Failed");
        });
    } catch (error) {
      // {
      //   status: "failed",
      //   error: error.message || "Fake Error",

      // }
      setIsError(true);
      throw new Error("Fake Error");
    } finally {
      setIsLoading(false);
    }
    if (result.status === "success") {
      setUser({ username: result.username, authToken: result.authToken });
      //persist User sign in Result
      localStorage.setItem("user", JSON.stringify(result));
      resize("logIn");
    } else {
      throw new Error(result.error);
    }
  };
  const signOut = () => {
    console.log("User Logged Out");
    localStorage.setItem("user", "{}");
    setUser("{}");
    navigate("/login");
  };
  const resize = async (command: "logIn" | "logOut") => {
    if (command === "logIn") await window.ipcRenderer.invoke("user-logged-in");
    else await window.ipcRenderer.invoke("user-logged-out");
  };

  useEffect(() => {
    if (!user || !user.username || !user?.authToken) {
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (!savedUser || !savedUser?.username || !savedUser.authToken) {
        signOut();
        resize("logOut");
      } else {
        setUser(savedUser);
        resize("logIn");
      }
    }
  }, [user]);

  return { user, isLoading, isError, signIn, signOut } as const;
}
export { useProvideAuth };
