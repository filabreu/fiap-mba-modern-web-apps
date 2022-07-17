import React, { useContext } from "react";
import UserInfoContext, {
  UserInfoContextType,
} from "../../Store/UserInfo/UserInfoContext";
import { Typography, Stack } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Chip from "@mui/material/Chip";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const context = useContext<UserInfoContextType>(UserInfoContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const product = () => {
    handleClose();
    router.push('/product')

  };

  const favorite = () => {
    handleClose();
    router.push('/favorites')
  }

  const logout = () => {
    context.makeLogOut();
    
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              variant="contained"
              color="info"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Menu
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={product}>Produtos</MenuItem>
              <MenuItem onClick={favorite}>Favoritos</MenuItem>
            </Menu>
            <Typography gutterBottom variant="subtitle2"></Typography>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <div>
              <Chip label={context.userInfo.name} />
            </div>
            <Button variant="contained" onClick={() => logout()}>
              LogOut
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header
