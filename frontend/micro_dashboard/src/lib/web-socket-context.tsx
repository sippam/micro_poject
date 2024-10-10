"use client";
import { AllGraph } from "@/types/all-graph";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { convertThaiDate } from "./thai-date";

const initValue: AllGraph = {
  dataMicro: [],
  closeConnection: (isDisconnect: boolean) => {},
};
const WebSocketContext = createContext<AllGraph>(initValue);

export function useWebSocket() {
  return useContext(WebSocketContext);
}

interface Props {
  children: ReactNode;
}

export function WebSocketProvider({ children }: Props) {
  const [dataMicro, setDataMicro] = useState<
    { time_stamp: string; acc: string; temp: string }[]
  >([]);

  const ws = useRef<WebSocket | null>(null); // Define ws as a ref to persist between renders

  useEffect(() => {
    connectWebSocket();

    // Clean up on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const connectWebSocket = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      // Do nothing if WebSocket is already open
      console.log("WebSocket is already open");
      return;
    }

    if (ws.current && (ws.current.readyState === WebSocket.CLOSING || ws.current.readyState === WebSocket.CLOSED)) {
      console.log("Reconnecting WebSocket...");
    }

    ws.current = new WebSocket("ws://154.84.153.48:8080");

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setDataMicro((prev) => [
        ...prev,
        {
          time_stamp: convertThaiDate(data.time_stamp),
          acc: data.acc,
          temp: data.temp,
        },
      ]);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };
  };

  const closeConnection = (isDisconnect: boolean) => {
    if (ws.current) {
      if (isDisconnect) {
        ws.current.close(); // Close WebSocket
      } else {
        if (ws.current.readyState === WebSocket.CLOSED || ws.current.readyState === WebSocket.CLOSING) {
          connectWebSocket(); // Reconnect WebSocket if it's closed
        }
      }
    }
  };

  const value: AllGraph = {
    dataMicro,
    closeConnection,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}
