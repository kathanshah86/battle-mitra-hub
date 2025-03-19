
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CountdownTimerProps {
  targetDate: string | Date;
  label?: string;
  onComplete?: () => void;
}

const CountdownTimer = ({ 
  targetDate, 
  label = "Registration closes in", 
  onComplete 
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsComplete(true);
        if (onComplete) onComplete();
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  return (
    <Card className="bg-esports-darker p-4 border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-4 w-4 text-esports-purple" />
        <span className="text-sm text-gray-300">{isComplete ? "Registration closed" : label}</span>
      </div>
      
      {!isComplete ? (
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col">
            <div className="text-xl md:text-2xl font-bold">{timeLeft.days}</div>
            <div className="text-xs text-gray-400">Days</div>
          </div>
          <div className="flex flex-col">
            <div className="text-xl md:text-2xl font-bold">{timeLeft.hours}</div>
            <div className="text-xs text-gray-400">Hours</div>
          </div>
          <div className="flex flex-col">
            <div className="text-xl md:text-2xl font-bold">{timeLeft.minutes}</div>
            <div className="text-xs text-gray-400">Mins</div>
          </div>
          <div className="flex flex-col">
            <div className="text-xl md:text-2xl font-bold">{timeLeft.seconds}</div>
            <div className="text-xs text-gray-400">Secs</div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400">
          Registration period has ended
        </div>
      )}
    </Card>
  );
};

export default CountdownTimer;
