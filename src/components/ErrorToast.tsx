import React, { useState, useEffect } from "react";

interface ErrorToastProps {
  message?: string;
  duration?: number;
}

const ErrorToast: React.FC<ErrorToastProps> = ({
  message = "An unexpected error has occurred. Please try again.",
  duration = 5000,
}) => {
  const [ visible, setVisible ] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [ duration ]);

  if (!visible) return null;

  return (
    <span className="fixed bottom-6 right-6 max-w-xs bg-red-500 text-white rounded-2xl shadow-lg p-4 flex items-center space-x-4 animate-slideIn">
      <div className="flex-1">
        <p className="font-medium">{message}</p>
      </div>
    </span>
  )
};
export default ErrorToast;
