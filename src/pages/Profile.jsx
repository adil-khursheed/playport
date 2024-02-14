import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Profile = () => {
  const [user, setUser] = useState();
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(`/users/c/${username}`, {
          signal: controller.signal,
        });
        console.log(response?.data.data);
        isMounted && setUser(response?.data.data);
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <Link to={"/"}>Go to home</Link>
      <br />
      <img src={user?.avatar.url} alt={user?.username} className="w-28 h-28" />
      <h2>{user?.fullName}</h2>
    </>
  );
};

export default Profile;
