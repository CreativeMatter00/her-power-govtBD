import React, { useEffect, useState } from 'react';

interface OtpTimerProps {
  initialTime: number; 
}

const OtpTimer: React.FC<OtpTimerProps> = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId); 
  }, [timeLeft]);

  // Convert seconds to MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="text-gray-600 text-center mt-4">
       {timeLeft === 0 ? (
        "OTP is Expired"
      ) : (
        <>
          OTP is valid for: <span className="font-semibold">{formatTime(timeLeft)}</span>
        </>
      )}
    </div>
  );
};

export default OtpTimer;
