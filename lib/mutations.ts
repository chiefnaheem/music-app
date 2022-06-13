import fetcher from "./fetcher";

export const auth = async (mode: 'login' | 'register', body: {email: string, password: string}) => {
    return fetcher(`${mode}`, body);
}