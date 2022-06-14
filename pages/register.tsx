import AuthForm from '../components/AuthForm';

const register = () => {
    return <AuthForm mode="register" />;
}
register.authPage = true

export default register;