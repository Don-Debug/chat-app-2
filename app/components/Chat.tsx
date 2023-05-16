import {
  Flex,
  Button,
  Text,
  Input,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import { GoSignOut } from "react-icons/go";
import { RiSendPlaneFill } from "react-icons/ri";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { format } from "date-fns";

interface Message {
  text: string;
  createdAt: any;
  user: string;
  photo: string;
  id: string;
}
export default function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [messages, setMessages] = useState<Message[]>([]);
  const endOfMessages = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (endOfMessages.current) {
      endOfMessages.current.scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    const queryMessages = query(messagesRef, orderBy("createdAt"));
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages: any = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsuscribe();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName,
      photo: auth.currentUser?.photoURL,
    });
    setNewMessage("");
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
          color="#fff"
          _hover={{ bgColor: "transparent" }}
          onClick={() => signOut(auth)}
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
        {messages.map((message, index) => {
          const createdAt = message.createdAt
            ? message.createdAt.toDate()
            : null;
          const formattedTime = createdAt ? format(createdAt, "hh:mm a") : "";
          return (
            <Flex
              direction={
                message.user === auth.currentUser?.displayName
                  ? "row-reverse"
                  : "row"
              }
              alignSelf={
                message.user === auth.currentUser?.displayName ? "end" : "start"
              }
              mt="1rem"
              key={message.id}
            >
              <Avatar
                src={`${message.photo}`}
                mx="0.5rem"
                size={{ base: "sm", md: "sm", lg: "md" }}
                pointerEvents="none"
              />

              <Flex
                direction="column"
                width={{ base: "70%", md: "70%", lg: "70%" }}
                bg="#f5f5f5"
                p="1rem"
                rounded="md"
                background={
                  message.user === auth.currentUser?.displayName
                    ? "#E9E9E9"
                    : "#E4E4E4"
                }
              >
                <Text wordBreak="break-word" fontSize="1rem">
                  {message.text}
                </Text>
                <Text
                  alignSelf="end"
                  fontSize="0.8rem"
                  mt="0.3rem"
                  color="#8f8f8f"
                >
                  {formattedTime}
                </Text>
              </Flex>
            </Flex>
          );
        })}
        <div ref={endOfMessages}></div>
      </Flex>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
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
            placeholder="Type something..."
            background="#fff"
            color="#151515"
            _focusVisible={{ boxShadow: "offset", zIndex: 0, border: "offset" }}
            _hover={{ border: "offset" }}
            autoComplete="off"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <Button
            bgColor="transparent"
            _hover={{ bgColor: "transparent" }}
            type="submit"
          >
            <RiSendPlaneFill size={60} color="#fff" />
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
