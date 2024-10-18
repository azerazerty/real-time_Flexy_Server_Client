import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import ChartUserByCountry from "../components/ChartUserByCountry";
import CustomizedTreeView from "../components/CustomizedTreeView";
import CustomizedDataGrid from "../components/CustomizedDataGrid";
import HighlightedCard from "../components/HighlightedCard";
import PageViewsBarChart from "../components/PageViewsBarChart";
import SessionsChart from "../components/SessionsChart";
import StatCard, { StatCardProps } from "../components/StatCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SimCardIcon from "@mui/icons-material/SimCard";
import useNetworkInfo from "../hooks/useNetworkInfo"; // Import the custom hook

const data: StatCardProps[] = [
  {
    title: "Total Balance",
    price: true,
    value: "7856,02",
    color: "success",
    icon: <AccountBalanceWalletIcon color="secondary" fontSize="large" />,

    // interval: "Last 30 days",
    // trend: "up",
    // data: [
    //   200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340,
    //   380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    // ],
  },
  {
    title: "Total SIM Numbers",
    price: false,
    value: "12",
    color: "primary",

    icon: <SimCardIcon color="secondary" fontSize="large" />,
    // interval: "Last 30 days",
    // trend: "down",
    // data: [
    //   1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600,
    //   820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300,
    //   220,
    // ],
  },
  // {
  //   title: "Event count",
  //   value: "200k",
  //   price: false,
  //   icon: <AccountBalanceWalletIcon color="secondary" fontSize="large" />,
  //   // interval: "Last 30 days",
  //   // trend: "neutral",
  //   // data: [
  //   //   500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510,
  //   //   530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
  //   // ],
  // },
];

export default function Home() {
  const { networkInfo, loading, error } = useNetworkInfo();

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h5" variant="h5" sx={{ mb: 2 }}>
        <strong> Overview </strong>
      </Typography>

      <Grid
        container
        spacing={4}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2), justifyContent: "space-evenly" }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 4 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        {/* <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid> */}
        {/* <Grid size={{ sm: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid> */}
      </Grid>
      {/* <Typography
        component="h2"
        variant="h6"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Details
      </Typography> */}

      {/* <Grid container spacing={2} columns={12}>
        <Grid size={{ md: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid> */}
      {/* <Grid container spacing={2} columns={12}>
        <CustomizedDataGrid />
      </Grid> */}
      <Box sx={{ mt: 10 }}>
        <Typography component="h5" variant="h5">
          <strong>Device Info: </strong>
        </Typography>
        <Typography component="span" sx={{ mb: 2, ml: 2 }}>
          <>
            {loading && <p>Loading network information...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <>
                <p>
                  <strong>Public IP Address:</strong> {networkInfo.publicIp}
                </p>
                <p>
                  <strong>MAC Address:</strong> {networkInfo.localInfo[0].mac}
                </p>
                <p>
                  <strong>Local IP Address:</strong>{" "}
                  {networkInfo.localInfo[0].ip}
                </p>
              </>
            )}
          </>
        </Typography>
      </Box>
      {/* <Copyright sx={{ my: 4 }} /> */}
    </Box>
  );
}
