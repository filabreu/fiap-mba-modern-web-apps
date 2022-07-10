import React, { useContext } from "react";
import UserInfoContext, {
  UserInfoContextType,
} from "../../Store/UserInfo/UserInfoContext";
import { Typography, Stack, Button } from "@mui/material";

const Header = () => {
  const context = useContext<UserInfoContextType>(UserInfoContext);
  return (
    <div>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Typography
          gutterBottom
          variant="subtitle2"
        ></Typography>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="primary" onClick={() => context.makeLogOut()}>LogOut</Button>
      </Stack>
    </div>
  );
};

export default Header;