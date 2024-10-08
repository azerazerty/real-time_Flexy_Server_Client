import { useState } from "react";

type userType =
  | {
      username: string;
      authToken: string;
    }
  | {}
  | null;

function useProvideAuth() {
  const [user, setUser] = useState<userType>(null);
  //later we add signin , signout , isLoading

  return [user, setUser] as const;
}
export { useProvideAuth };
