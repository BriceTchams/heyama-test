import { useEffect } from "react";
import { io } from "socket.io-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSocket = (onNewObject: (obj: any) => void) => {
  useEffect(() => {
    try {
      const socket = io("https://api-heyama-nestjs.vercel.app", {
        transports: ["polling"],
        reconnection: false, // ne pas boucler en cas d'échec
      });

    //   socket.on("connect_error", (err) => {
    //     console.warn("Socket non disponible sur ce serveur :", err.message);
    //     socket.disconnect();
    //   });

      socket.on("object:created", (newObject) => {
        onNewObject(newObject);
      });

      return () => {
        socket.disconnect();
      };
    } catch (err) {
      console.warn("Socket.io non disponible");
    }
  }, []);
};