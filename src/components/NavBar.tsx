import {
  AppBar,
  Box,
  MenuItem,
  Toolbar,
  Typography,
  InputBase,
  Avatar,
  Container,
  IconButton,
  Menu,
  TextField,
  Input,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import EditIcon from "@material-ui/icons/Edit";
import { useLocation, useNavigate } from "react-router";
import React, { useState } from "react";

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        marginBottom: 2,
      }}
    >
      <AppBar
        position="static"
        sx={{
          px: 2,
        }}
      >
        <Toolbar disableGutters>
          <Container
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <EditIcon />
            <MenuItem onClick={() => navigate("/")}>
              <Typography>Home</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate("/about")}>
              <Typography>About</Typography>
            </MenuItem>
            {/* search */}
            <Input placeholder="Search" />
          </Container>
          <IconButton onClick={handleOpenUserMenu} className="p-0">
            <Avatar alt="Mila" src="/mila.webp" />
          </IconButton>

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              key={"printerlogs"}
              onClick={() => {
                handleCloseUserMenu();
                navigate("/account");
              }}
            >
              <Typography sx={{ textAlign: "center" }}>
                Trang cá nhân
              </Typography>
            </MenuItem>
            <MenuItem
              key={"logout"}
              onClick={() => {
                handleCloseUserMenu();
                navigate("/login");
              }}
            >
              <Typography sx={{ textAlign: "center" }}>Đăng xuất</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
