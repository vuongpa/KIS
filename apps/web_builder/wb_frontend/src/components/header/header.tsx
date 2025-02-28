import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { SearchBar } from "../search_bar";
import {
  useAppSelector,
  selectIsLoggedIn,
  useAppDispatch,
  logOut,
  sessionStorageKeys,
} from "../../redux_logic";
import { callPostAPI } from "../../api_utils";

// Định nghĩa hàm gọi API logout
const logoutRequest = async (): Promise<any> => {
  const logoutResponse = await callPostAPI("/logout");
  return logoutResponse.data;
};

export function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const appDispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: logoutRequest,

    onSuccess: () => {
      appDispatch(logOut());
      localStorage.removeItem("refreshToken");
      navigate("/auth/login");
      setLoading(false);
    },

    onError: (error: Error) => {
      console.error("Logout error:", error);
      setLoading(false);
      toast.error(
        "An error occurred while logging out. Please try again later."
      );
    },
  });

  const { mutate: logout } = mutation;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    handleMenuClose();
    navigate("/auth/login");
  };

  const handleRegisterClick = () => {
    handleMenuClose();
    navigate("/auth/register");
  };
  const handleProfileClick = () => {
    handleMenuClose();
    const userId = localStorage.getItem(sessionStorageKeys.userId);
  
    if (!userId) {
      console.error("User ID not found");
      return;
    }
    
    navigate(`/profile/${userId}`);
  };
  
  

  const handleLogoutClick = () => {
    if (!loading) {
      setLoading(true);
      logout();
    }
  };

  return (
    <Box
      className="bg-white text-black shadow-md w-full"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        
      }}
    >
      <Toolbar className="flex justify-between items-center px-4 md:px-6 border-b border-gray-300">
        <Typography variant="h6" className="font-bold text-lg">
        </Typography>

        <div className="flex items-center gap-3">
          <SearchBar />

          <Box className="flex items-center gap-4">
            <IconButton className="text-black">
              <NotificationsIcon />
            </IconButton>

            <Box
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleMenuOpen}
            >
              <IconButton className="p-0">
                <img
                  src="/header_img/Ellipse 1.png"
                  alt="User Icon"
                  className="rounded-full w-8 h-8"
                />
              </IconButton>
              <Box className="hidden md:flex items-center gap-1">
                <span className="text-sm font-semibold">Account</span>
                <KeyboardArrowDownIcon />
              </Box>
            </Box>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{ className: "mt-1 min-w-[150px]" }}
          >
            {!isLoggedIn ? (
              <>
                <MenuItem onClick={handleLoginClick}>Login</MenuItem>
                <MenuItem onClick={handleRegisterClick}>Register</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                  {loading ? "Logging out..." : "Logout"}
                </MenuItem>
              </>
            )}
          </Menu>
        </div>
      </Toolbar>
    </Box>
  );
}
