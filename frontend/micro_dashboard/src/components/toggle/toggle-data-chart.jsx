import React, { useState } from "react";
import { CirclePause, CirclePlay } from "lucide-react"; // Use CirclePlay for re-opening
import { Toggle } from "@/components/ui/toggle";
import { useWebSocket } from "@/lib/web-socket-context";

const ToggleDataChart = () => {
  const { closeConnection } = useWebSocket();
  const [isDisconnect, setIsDisconnected] = useState(true); // State to track connection status

  // Toggle function to handle both closing and re-opening WebSocket connection
  const handleToggle = () => {
    closeConnection(isDisconnect); // Close WebSocket connection

    setIsDisconnected(!isDisconnect); // Toggle the connection status
  };

  return (
    <Toggle variant={"outline"} aria-label="Toggle data" onClick={handleToggle}>
      {isDisconnect ? (
        <>
          <CirclePause className="h-4 w-4 mr-2" />
          <span>หยุดการส่งข้อมูล</span>
        </>
      ) : (
        <>
          <CirclePlay className="h-4 w-4 mr-2" />
          <span>เริ่มการส่งข้อมูล</span>
        </>
      )}
    </Toggle>
  );
};

export default ToggleDataChart;
