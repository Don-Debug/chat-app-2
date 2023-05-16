import { Button, Flex } from "@chakra-ui/react";
import { TiMessages } from "react-icons/ti";
import google from "../../public/download.png";
import Image from "next/image";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase.config";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function LoginScreen() {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Flex
        bgGradient="linear(to-tl, #890000, #07317A)"
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap="2rem"
        py="4rem"
        px="3rem"
        rounded="3xl"
        boxShadow="5px 5px 20px 1px #cdcdcdda"
      >
        <TiMessages size={100} color="#f1f1f1" />
        <Button
          fontSize="2xl"
          py="1.7rem"
          px="4rem"
          bgColor="#f9f9f9"
          color="#2f2f2f"
          mt="2rem"
          _hover={{ bgColor: "#d9d9d9" }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="1rem"
          onClick={signInWithGoogle}
        >
          <Image
            src={google}
            alt="google"
            style={{ width: "2rem", height: "2rem", pointerEvents: "none" }}
          />
          Sign Up
        </Button>
      </Flex>
    </>
  );
}
