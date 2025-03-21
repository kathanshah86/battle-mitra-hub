
import { useEffect, useState } from "react";
import { Clock, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CountdownTimerProps {
  targetDate: string | Date;
  label?: string;
  onComplete?: () => void;
  showAlert?: boolean;
  tournamentId?: string;
  showRegisterButton?: boolean;
  overrideHours?: number; // Add new prop to override the countdown with a specific hour value
}

const CountdownTimer = ({ 
  targetDate, 
  label = "Tournament starts in", 
  onComplete,
  showAlert = false,
  tournamentId,
  showRegisterButton = false,
  overrideHours
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (overrideHours !== undefined) {
      // If override hours provided, use that instead of targetDate calculation
      setTimeLeft({
        days: 0,
        hours: overrideHours,
        minutes: 0,
        seconds: 0,
      });
      
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          let newSeconds = prevTime.seconds - 1;
          let newMinutes = prevTime.minutes;
          let newHours = prevTime.hours;
          let newDays = prevTime.days;
          
          if (newSeconds < 0) {
            newSeconds = 59;
            newMinutes -= 1;
          }
          
          if (newMinutes < 0) {
            newMinutes = 59;
            newHours -= 1;
          }
          
          if (newHours < 0) {
            newHours = 23;
            newDays -= 1;
          }
          
          if (newDays === 0 && newHours === 0 && newMinutes === 0 && newSeconds === 0) {
            if (onComplete) onComplete();
            setIsComplete(true);
            clearInterval(timer);
          }
          
          return {
            days: newDays,
            hours: newHours,
            minutes: newMinutes,
            seconds: newSeconds
          };
        });
      }, 1000);
      
      return () => clearInterval(timer);
    } else {
      // Original implementation using targetDate
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
    }
  }, [targetDate, onComplete, overrideHours]);

  return (
    <Card className={`overflow-hidden rounded-xl border-none ${showAlert && !isComplete && timeLeft.days < 1 ? "bg-gradient-to-br from-red-900/30 to-black/80" : "bg-gradient-to-br from-esports-darker to-black/90"}`}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {showAlert && !isComplete && timeLeft.days < 1 ? (
            <AlertCircle className="h-5 w-5 text-red-400" />
          ) : (
            <Clock className="h-5 w-5 text-esports-purple" />
          )}
          <span className={`text-base font-medium ${showAlert && !isComplete && timeLeft.days < 1 ? "text-red-300" : "text-gray-200"}`}>
            {isComplete ? "Tournament has started" : label}
          </span>
        </div>
        
        {!isComplete ? (
          <div className="grid grid-cols-4 gap-3 text-center mb-6">
            <div className="flex flex-col bg-black/40 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.days}</div>
              <div className="text-xs uppercase tracking-wider mt-1 text-gray-400">Days</div>
            </div>
            <div className="flex flex-col bg-black/40 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.hours}</div>
              <div className="text-xs uppercase tracking-wider mt-1 text-gray-400">Hours</div>
            </div>
            <div className="flex flex-col bg-black/40 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.minutes}</div>
              <div className="text-xs uppercase tracking-wider mt-1 text-gray-400">Minutes</div>
            </div>
            <div className="flex flex-col bg-black/40 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-bold text-white">{timeLeft.seconds}</div>
              <div className="text-xs uppercase tracking-wider mt-1 text-gray-400">Seconds</div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-300 font-medium">
            The tournament has started
          </div>
        )}
        
        {showRegisterButton && !isComplete && (
          <>
            <Button 
              asChild
              className="w-full py-6 text-base font-medium bg-gradient-to-r from-esports-purple to-esports-blue hover:opacity-90 transition-opacity"
            >
              <Link to={tournamentId ? `/tournaments/${tournamentId}` : "/tournaments"}>
                Register Now
              </Link>
            </Button>
            
            <p className="text-xs text-center text-gray-400 mt-3">
              Registration closes 1 hour before the tournament starts
            </p>
          </>
        )}
        
        {showAlert && !isComplete && timeLeft.days < 1 && (
          <>
            <Separator className="my-3 bg-red-800/30" />
            <div className="text-sm text-red-400 text-center">
              Hurry! Tournament is starting soon
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default CountdownTimer;
