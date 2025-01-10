import {
  AppBar,
  Box,
  MenuItem,
  Toolbar,
  Typography,
  InputBase,
  Avatar,
  Container,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import EditIcon from "@material-ui/icons/Edit";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavBar() {
  return (
    <Box
      sx={{
        flexGrow: 1,
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
        <Toolbar
          disableGutters
        >
          <Container sx={{ display: "flex", gap: 2, flexDirection: "row", alignItems: "center" }}>
            <EditIcon/>
            <MenuItem>
              <Typography>Home</Typography>
            </MenuItem>
            <MenuItem>
              <Typography>About</Typography>
            </MenuItem>
            {/* search */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Container>
          <Avatar></Avatar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
