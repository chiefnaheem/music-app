import {Box, Button, Flex, Input} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useState, FC} from "react";
import NextImage from "next/image";
import { auth } from "../lib/mutations";


const AuthForm: FC<{ mode: 'register' | 'login' }> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    await auth(mode, {email, password});
    setIsLoading(false);
    router.push("/");
  }

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex height="100px" justifyContent="center" alignItems="center" borderBottom="white 1px solid" >
        <NextImage src="/logo.png" width={60} height={120} />
      </Flex>
      <Flex height="calc(100vh-100px)" justifyContent="center" alignItems="center">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
            <form onSubmit={handleSubmit}>
                <Input placeholder="email" type="email" onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" bg="green.500" isLoading={isLoading} sx={{
                    '&:hover': {
                        bg: 'green.400'
                    }
                }} >
                    {mode === "login" ? "Login" : "Register"}
                </Button>
            </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
