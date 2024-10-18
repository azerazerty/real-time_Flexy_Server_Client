// import React, { useEffect, useState } from "react";
// import { useAuth } from "../providers/Auth";
// import { Navigate } from "react-router-dom";

// function Login() {
//   const { user, signIn, isError, isLoading } = useAuth();
//   const [result, setResult] = useState<any>(null);
//   useEffect(() => {
//     if (!user || !user?.username || !user?.authToken) {
//       console.log("fired");
//       async function login() {
//         let r = await signIn({
//           username: "admin",
//           password: "admin",
//         });
//         setResult(r);
//       }
//       login();
//     }
//   }, [user]);
//   if (user && user?.username && user?.authToken) {
//     return <Navigate to="/home"></Navigate>;
//   }

//   return (
//     <>
//       <div>Login Page</div>
//       {isLoading && <div>Logging in </div>}
//       {isError && <div>{result.error}</div>}
//     </>
//   );
// }

// export default Login;

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
// import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from "@mui/material/FormControlLabel";
// import Divider from '@mui/material/Divider';
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
// import ForgotPassword from './ForgotPassword';
import Logo from "../assets/logo.png";
import { useAuth } from "../providers/Auth";
import { Navigate } from "react-router-dom";

import ColorModeSelect from ".././theme/ColorModeSelect";
import CircularProgress from "@mui/material/CircularProgress";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  // padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    // padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn(props: { disableCustomTheme?: boolean }) {
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { user, signIn, isError, isLoading } = useAuth();
  const [result, setResult] = React.useState<any>(null);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (usernameError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });

    await signIn({
      username: data.get("username"),
      password: data.get("password"),
    })
      .then()
      .catch(() => {
        setPasswordError(true);
        setUsernameError(true);
        setPasswordErrorMessage("Invalid Login Credentials");
      });
  };

  const validateInputs = () => {
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    // if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
    if (!username.value || username.value.length < 3) {
      setUsernameError(true);
      setUsernameErrorMessage("Please enter a valid email username.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (!password.value || password.value.length < 3) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  if (user && user?.username && user?.authToken) {
    return <Navigate to="/home"></Navigate>;
  }
  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <Card variant="outlined">
        {/* <SitemarkIcon /> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "2ch",
            alignItems: "center",
            mt: "calc(var(--template-frame-height, 0px) + 4px)",
            p: 1.5,
          }}
        >
          <Box
            component="img"
            sx={{
              height: 64,
              width: 64,
            }}
            alt="Logo"
            src={Logo}
          />
          <Box>
            <Typography
              sx={{ mr: 0.5, display: "inline" }}
              color="secondary"
              component="h4"
              variant="h4"
            >
              <Box fontWeight="fontWeightBold" display="inline">
                ICH
              </Box>
            </Typography>
            <Typography
              sx={{ display: "inline" }}
              color="primary"
              component="h4"
              variant="h4"
            >
              <Box fontWeight="fontWeightBold" display="inline">
                7EN
              </Box>
            </Typography>
          </Box>
        </Box>

        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <TextField
              error={usernameError}
              helperText={usernameErrorMessage}
              id="username"
              type="username"
              name="username"
              placeholder="username"
              autoComplete="username"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={usernameError ? "error" : "primary"}
              sx={{ ariaLabel: "username" }}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              {/* <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: 'baseline' }}
                >
                  Forgot your password?
                </Link> */}
            </Box>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
            disabled={isLoading}
          >
            {isLoading && (
              <>
                <CircularProgress
                  size="30px"
                  sx={{ mr: "5px" }}
                  color="inherit"
                />
                {`  Verifying
                Please Wait ...`}
              </>
            )}
            {!isLoading && <>{"Sign in"}</>}
          </Button>
          {/* <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <span>
                <Link
                  href="/material-ui/getting-started/templates/sign-in/"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Sign up
                </Link>
              </span>
            </Typography> */}
        </Box>
      </Card>
    </SignInContainer>
  );
}
