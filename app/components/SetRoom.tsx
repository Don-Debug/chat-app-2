import {
  Flex,
  Button,
  Text,
  Input,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import { GoSignOut } from "react-icons/go";
import { BiLockAlt } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { auth } from "../../firebase.config";
import { useState, useRef } from "react";

export default function SetRoom(props: any) {
  const { Room, SetTheRoom } = props;
  const roomInputRef = useRef<HTMLInputElement>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleButtonClick = () => {
    const inputValue = roomInputRef.current?.value;
    if (inputValue?.trim() !== "") {
      SetTheRoom(inputValue);
    }
  };

  return (
    <Flex
      bgColor="#fff"
      direction="column"
      alignItems="center"
      justifyContent="center"
      boxShadow="10px 10px 30px 8px #cdcdcd83"
      width={{ base: "95vw", md: "35rem", lg: "40rem" }}
    >
      <Flex
        py="0.5rem"
        bg="#1f1f1f"
        w="100%"
        px="2rem"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex gap="1rem" justifyContent="center" alignItems="center">
          <Avatar
            size={{ base: "xs", md: "sm", lg: "sm" }}
            src={`${auth.currentUser?.photoURL}`}
            pointerEvents="none"
          >
            <AvatarBadge boxSize="1.13em" bg="green.500" />
          </Avatar>

          <Text
            fontSize={{ base: "md", md: "lg", lg: "x-large" }}
            fontWeight="bold"
            color="#fff"
          >
            {auth.currentUser?.displayName}
          </Text>
        </Flex>
        <Button
          mt="0.3rem"
          bgColor="transparent"
          color="#9f9f9f"
          _hover={{ bgColor: "transparent" }}
          pointerEvents="none"
          cursor="not-allowed"
        >
          <GoSignOut size={25} />
        </Button>
      </Flex>

      <Flex
        height="70vh"
        overflowY="auto"
        scrollSnapType="y"
        direction="column"
        w="100%"
        py="1rem"
        bgGradient="linear(to-tl, #890000, #07317A)"
      >
        <Flex
          bgGradient="linear(to-tl, #890000, #07317A)"
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap="2rem"
          py="3rem"
          px="2rem"
          rounded="3xl"
          boxShadow="5px 5px 20px 1px #cdcdcdda"
          width={{ base: "95%", sm: "70%", md: "80%", lg: "60%" }}
          margin="auto"
        >
          <BiLockAlt size={100} color="#f1f1f1" />
          <Input
            _placeholder={{ color: "inherit" }}
            placeholder="Create Your Room Id"
            background="#fff"
            color="#151515"
            _focusVisible={{ boxShadow: "offset", zIndex: 0, border: "offset" }}
            _hover={{ border: "offset" }}
            autoComplete="off"
            ref={roomInputRef}
          />
          <Button
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            py={{ base: "1rem", md: "1.7rem", lg: "1.7rem" }}
            px={{ base: "1rem", md: "2rem", lg: "2rem" }}
            bgColor="#f9f9f9"
            color="#2f2f2f"
            onClick={handleButtonClick}
          >
            Open Private Room
          </Button>
        </Flex>
      </Flex>
      <form style={{ width: "100%" }}>
        <Flex
          background="#1f1f1f"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          p="1rem"
          pr="0"
        >
          <Input
            _placeholder={{ color: "inherit" }}
            placeholder="Create Your Room To Type"
            background="#9f9f9f"
            color="#2f2f2f"
            border="unset"
            _focusVisible={{ boxShadow: "offset", zIndex: 0, border: "offset" }}
            _hover={{ border: "offset" }}
            autoComplete="off"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            pointerEvents="none"
            cursor="not-allowed"
          />
          <Button
            bgColor="transparent"
            _hover={{ bgColor: "transparent" }}
            type="submit"
            pointerEvents="none"
            cursor="not-allowed"
          >
            <RiSendPlaneFill size={60} color="#9f9f9f" />
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
