import { useEffect, useState } from "react";
import { padTime } from "../time.ts";

export default function Time() {
  const [now, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <p>
      <span>
        {padTime(now.getUTCHours())}:{padTime(now.getUTCMinutes())} UTC
      </span>
      {"⸺"}
      <span>{now.toLocaleTimeString()}</span>
    </p>
  );
}
