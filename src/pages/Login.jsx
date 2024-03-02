import { LoginComponent } from "../components";

const Login = () => {
  return (
    <div className="max-w-screen-xl w-full h-screen mx-auto relative">
      <img
        src="/assets/auth-bg-2.svg"
        alt="Login-Bg"
        className="absolute left-0 right-0 top-0 bottom-0 h-screen w-full -z-10 object-cover"
      />
      <LoginComponent />
    </div>
  );
};

export default Login;
