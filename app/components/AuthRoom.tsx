import { useState } from "react";
import SetRoom from "./SetRoom";
import PrivateRoom from "./PrivateRoom";

export default function AuthRoom() {
  const [room, setRoom] = useState(null);
  if (!room) {
    return <SetRoom Room={room} SetTheRoom={setRoom} />;
  }
  return <PrivateRoom room={room} />;
}
