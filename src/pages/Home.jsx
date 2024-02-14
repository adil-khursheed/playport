import { axiosPrivate } from "../api/axios";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await axiosPrivate.post(
      "/users/logout",
      {},
      {
        withCredentials: true,
      }
    );

    if (response) {
      setAuth({});
      navigate("/login");
    }
  };
  return (
    <>
      <Link to={"/profile/chai1"}>Go to profile</Link>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Home;
