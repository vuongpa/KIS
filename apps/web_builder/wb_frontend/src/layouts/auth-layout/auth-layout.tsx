import { Outlet } from "react-router-dom";
import { DefaultFcProps, HasClasses } from "../../react_utils";
export const AuthLayout: React.FC<DefaultFcProps & HasClasses> = ({ classes }) => {
  return (
    <div className={`flex items-center justify-center min-h-screen bg-gray-100 ${classes?.pageWrapper}`}>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <Outlet />
      </div>
    </div>
  );
};
