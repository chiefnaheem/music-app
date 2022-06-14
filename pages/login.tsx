import AuthForm from "../components/AuthForm";

const login = () => {
  return <AuthForm mode="login" />;
};
login.authPage = true;

export default login;
