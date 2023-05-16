"use client";
import { Button, Flex } from "@chakra-ui/react";
import Chat from "./components/Chat";
import LoginScreen from "./components/LoginScreen";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.config";
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";
import PrivateRoom from "./components/PrivateRoom";
import AuthRoom from "./components/AuthRoom";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [showSecondDiv, setShowSecondDiv] = useState(false);

  let toggleFirstDiv = () => {
    setShowFirstDiv(true);
    setShowSecondDiv(false);
  };

  const toggleSecondDiv = () => {
    setShowFirstDiv(false);
    setShowSecondDiv(true);
  };

  if (loading) {
    return (
      <Flex
        w="100%"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        bgGradient="linear(to-t, #13459E, #00328C, #00146C)"
      >
        <Spinner size="xl" color="#fff" />
      </Flex>
    );
  }

  if (!user) {
    return (
      <Flex
        w="100%"
        h="100vh"
        bgGradient="linear(to-t, #13459E, #00328C, #00146C)"
        justifyContent="center"
        alignItems="center"
      >
        <LoginScreen />
      </Flex>
    );
  }
  return (
    <>
      <Flex
        w="100%"
        h="100vh"
        bgGradient="linear(to-t, #13459E, #00328C, #00146C)"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          direction="column"
          width={{ base: "95vw", md: "35rem", lg: "40rem" }}
          gap="0.1rem"
          py="1rem"
        >
          <Flex w="100%">
            <Button
              onClick={toggleFirstDiv}
              w="50%"
              background="unset"
              borderBottomColor={showFirstDiv ? "#fff" : "transparent"}
              borderBottomWidth="2px"
              borderRadius="unset"
              color="#fff"
              _hover={{
                background: "unset",
                borderBottomColor: "#9d9d9d",
                borderBottomWidth: "2px",
              }}
            >
              <h1 className=" sm:px-[2rem] px-3 py-[1rem] bg-[#2F2F2F] sm:rounded-[1.5rem] rounded-[1rem] box-shadow">
                Global
              </h1>
            </Button>
            <Button
              onClick={toggleSecondDiv}
              w="50%"
              background="unset"
              borderBottomColor={showSecondDiv ? "#fff" : "transparent"}
              borderBottomWidth="2px"
              borderRadius="unset"
              color="#fff"
              _hover={{
                background: "unset",
                borderBottomColor: "#9d9d9d",
                borderBottomWidth: "2px",
              }}
            >
              <h1 className=" sm:px-[2rem] px-3 py-[1rem] bg-[#2F2F2F] sm:rounded-[1.5rem] rounded-[1rem] box-shadow">
                Private Room
              </h1>
            </Button>
          </Flex>
          {showFirstDiv && <Chat />}

          {showSecondDiv && <AuthRoom />}
        </Flex>
      </Flex>
    </>
  );
}
