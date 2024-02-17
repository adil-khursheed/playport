import { Loader } from "../components";
import { useLogoutUser } from "../features/authApi";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const { mutateAsync: logoutUser, isPending: isLoading } = useLogoutUser();

  const handleLogout = async () => {
    const response = await logoutUser();

    if (response) {
      setAuth({});
      navigate("/login");
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Link to={"/profile/chai1"}>Go to profile</Link>
          <br />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
};

export default Home;
