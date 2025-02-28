import { Outlet, useNavigate } from "react-router-dom";
import { DefaultFcProps, HasClasses } from "../../react_utils";
import {
  Header,
  Sidebar,
} from "../../components";
import {
  selectIsLoggedIn,
  setAccessToken,
  useAppSelector
} from "../../redux_logic";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { callPostAPI } from "../../api_utils";

export const DefaultLayout: React.FC<DefaultFcProps & HasClasses> = ({
  classes
}) => {

  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const goToLogInPage = () => navigate('/auth/login');

  const verifyToken = async () => {
    try {
      const verifyTokenRequest = await callPostAPI("/verify-token");
  
      let isAccessTokenValid = true;
  
      // TODO:
      // Nếu token không hợp lệ, gọi API để làm mới token
      if (verifyTokenRequest.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken'); 
        
        if (refreshToken) {
          // Nếu refresh token có sẵn, gọi API để làm mới token
          const refreshTokenRequest = await callPostAPI("/refresh-token", {
            refreshToken: refreshToken  // Gửi refresh token hiện tại lên server
          });
  
          if (refreshTokenRequest.status === 200) {
            const { accessToken } = refreshTokenRequest.data;
  
            // Cập nhật access token mới vào Redux
            dispatch(setAccessToken(accessToken));
          } else {
            // Nếu refresh token không hợp lệ, set isAccessTokenValid = false
            isAccessTokenValid = false;
          }
        } else {
          // Nếu không có refresh token, set isAccessTokenValid = false
          isAccessTokenValid = false;
        }
      }
  
      // Nếu token không hợp lệ, chuyển hướng tới trang đăng nhập
      if (!isAccessTokenValid) {
        goToLogInPage();
      }
  
    } catch (error) {
      console.error("Error verifying token:", error);
      goToLogInPage();
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      verifyToken();
    } else {
      goToLogInPage();
    }
  }, [isLoggedIn]);

  return (
    <div className={classes.pageWrapper} >
      <div className="flex w-full flex-1 md:pl-14 sm:pl-16">
        <Sidebar />
        <div className="flex-1 pt-16 ml-10 mr-3">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
