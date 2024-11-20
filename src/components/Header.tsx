import { IoLogIn, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice"

const Header = () => {
  const { email, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signout = () => {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-white z-50 border-b drop-shadow" >
      <div className="flex mx-8 my-3 justify-between items-center">
        <h1 className="text-2xl font-semibold">Project Wise</h1>

        {isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <h3 className="text-slate-600 text-sm">{email}</h3>

            <div className="flex items-center border rounded-md px-3 py-1 gap-2 hover:opacity-80">
              <IoLogOut />
              <button onClick={signout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <h3 className="text-slate-600 text-sm">{email}</h3>

            <div className="flex items-center border rounded-md px-3 py-1 gap-2 hover:opacity-80">
              <IoLogIn />
              <button onClick={() => navigate("/login")}>Login</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
