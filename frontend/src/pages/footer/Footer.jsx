import React from "react";
import { useState } from "react";
function Footer() {
  const date = new Date().toLocaleString();
  const [time, setTime] = useState(date);
  setInterval(() => {
    const updateTime = new Date().toLocaleString();
    setTime(updateTime);
  }, 1000);
  return (
    <div className="flex flex-col place-items-center w-full bottom-0 bg-[#E0FBE2] z-0 p-2 pb-0">
      <p className="font-bold text-sm">
        <strong>©️</strong> All rights are reserved
      </p>
      <p
        className="mb-3"
      >{`${time}`}</p>
    </div>
  );
}

export default Footer;
