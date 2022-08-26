import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import MovieIcon from "@mui/icons-material/Movie";
import TVIcon from "@mui/icons-material/Tv";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/series");
    else if (value === 3) navigate("/search");
  }, [value]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 100,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        style={{ backgroundColor: "#0E185F" }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Trending"
          icon={<WhatshotIcon />}
          style={{ color: "white" }}
        />
        <BottomNavigationAction
          label="Movies"
          icon={<MovieIcon />}
          style={{ color: "white" }}
        />
        <BottomNavigationAction
          label="TV Series"
          icon={<TVIcon />}
          style={{ color: "white" }}
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon />}
          style={{ color: "white" }}
        />
      </BottomNavigation>
    </Box>
  );
}
