import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			const check = newMessage.receiverId == selectedConversation.id
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			if (check) {
				setMessages([...messages, newMessage]);
			}
		});

		return () => socket?.off("newMessage"); // clean up when the component unmount and we dont want to listen form this "newMessage"
	}, [socket, setMessages, messages ,selectedConversation]);
};
export default useListenMessages;