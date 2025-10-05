import React, { useEffect, useState } from "react";

function Toast({ message, type, onClose, duration = 3000 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 500);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`${type === "error" ? "toast-error" : "toast-success"} ${show ? "show" : ""}`}>
      {message}
    </div>
  );
}

export default Toast;
