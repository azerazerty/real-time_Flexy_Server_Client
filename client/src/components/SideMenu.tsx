import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SelectContent from "./SelectContent";
import MenuContent from "./MenuContent";
import CardAlert from "./CardAlert";
import OptionsMenu from "./OptionsMenu";
import { IconButton } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Logo from "../assets/logo.png";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});
const username = "azer azert";

export default function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
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
        {/* <SelectContent /> */}

        <img src={Logo} width="64px"></img>
        {/* <Typography component="h4" variant="h4" sx={{}}>
          ICH7EN
        </Typography> */}
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
      <Divider />
      <MenuContent />
      {/* <CardAlert /> */}
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt={username.toUpperCase()}
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            {username.toUpperCase()}
          </Typography>
          {/* <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            riley@email.com
          </Typography> */}
        </Box>
        {/* <OptionsMenu /> */}
        <IconButton size="small">
          <LogoutRoundedIcon />
        </IconButton>
      </Stack>
    </Drawer>
  );
}
