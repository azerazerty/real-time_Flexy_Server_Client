import * as React from "react";
import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CustomDatePicker from "./CustomDatePicker";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import MenuButton from "./MenuButton";
import ColorModeIconDropdown from ".././theme/ColorModeIconDropdown";

import Search from "./Search";
import {
  ReactJSXElement,
  ReactJSXElementAttributesProperty,
} from "@emotion/react/types/jsx-namespace";
import { Chip, Typography } from "@mui/material";
import { useSocket } from "../hooks/useSocket";

interface SocketStatusProps {
  status: boolean;
}

function SocketStatus({ status }: SocketStatusProps) {
  return (
    <Chip
      sx={{ fontWeight: "bold" }}
      label={`${status ? "Connected" : "Not Connected"}`}
      color={`${status ? "success" : "error"}`}
      variant="outlined"
    />
  );
}

export default function Header() {
  const isConnected = useSocket();
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        // alignItems: { xs: "flex-start", md: "center" },
        alignItems: "center",
        justifyContent: "center",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      {/* <NavbarBreadcrumbs /> */}
      <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
        <Typography
          align="center"
          component="span"
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          Server Connection Status:
        </Typography>
        <SocketStatus status={isConnected} />
      </Stack>

      <Stack direction="row" sx={{ gap: 1 }}>
        {/* <Search /> */}
        {/* <CustomDatePicker /> */}
        {/* <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton> */}
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
