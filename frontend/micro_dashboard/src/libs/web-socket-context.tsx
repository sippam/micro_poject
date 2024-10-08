"use client";
import { AllGraph } from "@/types/all-graph";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { convertThaiDate } from "./thai-date";

const initValue: AllGraph = {
  dataMicro: [],
};
const WebSocketContext = createContext<AllGraph>(initValue);

export function useWebSocket() {
  return useContext(WebSocketContext);
}

interface Props {
  children: ReactNode;
}

export function WebSocketProvider({ children }: Props) {
  const [dataMicro, setDataMicro] = useState<AllGraph>(initValue);
  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket("ws://154.84.153.48:8080");

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setDataMicro((prev) => {
        return {
          dataMicro: [
            ...prev.dataMicro,
            {
              time_stamp: convertThaiDate(data.time_stamp),
              acc: data.acc,
              temp: data.temp,
            },
          ],
        };
      });
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Clean up on component unmount
    return () => {
      ws.close();
    };
  }, []);

  const value: AllGraph = {
    dataMicro: dataMicro.dataMicro,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
}
