import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  // Definir a data e hora final (no formato "AAAA-MM-DDTHH:MM:SS")
  const targetDate = new Date('2024-12-31T23:59:59');

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now; // Diferença em milissegundos

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(timer);
  }, []);

  return (
    <div className=' -skew-x-12 font-GillCondensedB'>
      <h1 className='text-[#ffda00]'>Contagem Regressiva</h1>
      {timeLeft.days !== undefined ? (
        <div className='grid  grid-flow-col border border-full   gap-x-2 items-end laptop:text-3xl text-white rounded-xl font-GillCondensedB'>
          <h2>{timeLeft.days} Dias</h2>
          <h2>{timeLeft.hours} Horas</h2>
          <h2>{timeLeft.minutes} Minutos</h2>
          <h2>{timeLeft.seconds} </h2>
        </div>
      ) : (
        <h2>Evento já começou!</h2>
      )}
    </div>
  );
};

export default CountdownTimer;