"use client";
 import { useState, useRef, useEffect ,ChangeEvent } from "react"
 import { Input } from "./ui/input"
 import { Button } from "./ui/button"

export default function CountDown  ()  {
   const [duration, setDuration] = useState <number|string>("")
   const [timeLeft,setTimeLeft] = useState<number>(0);
   const [isActive,setIsActive] = useState<boolean>(false);
   const [isPaused,setIsPaused] = useState <boolean>(false);
   const timerRef = useRef<NodeJS.Timeout|null>(null);


   const handleSetDuration = ():void => {
    if(typeof duration == "number" && duration > 0){
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current){
        clearInterval(timerRef.current)
      }
    }
   };

   const handleStart = ():void =>{
    if(timeLeft>0){
      setIsActive(true);
      setIsPaused(false);
    }
   };

   const handlePaused = ():void=>{
    if(isActive){
      setIsPaused(true);
      setIsActive(false);
      if(timerRef.current){
        clearInterval(timerRef.current)
      }
    }
   };
   const handleReset = ():void=>{
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration=="number" ? duration : 0)
    if(timerRef.current)
      {clearInterval(timerRef.current)}
   };

   useEffect(()=>{
    if(isActive&&!isPaused){
      timerRef.current = setInterval(()=>{
        setTimeLeft((previousTime)=>{
          if(previousTime<= 1){
            clearInterval(timerRef.current!);
            return 0
          }
          return previousTime -1
        })
      },1000);
    }
 return ()=>{
  if(timerRef.current){
    clearInterval(timerRef.current)
  }
 };


   },[isActive,isPaused])

   const formate=(time:number):string=>{
    const mint = Math.floor(time/60);
    const sec = time%60
    return `${String(mint).padStart(2,"0")}:${String(sec).padStart(2,"0")}`
   };
   const handleDurationChange = (e:ChangeEvent<HTMLInputElement>):void=>{
    setDuration(Number(e.target.value) || "")
   }
   return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-300">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full">
        <h1 className="text-5xl text-center font-bold mb-4 text-pink-5n00 dark:text-gray-200"> Coun-Down Timer <span className="flex justify-center text-yellow-400 mt-2" >
          Made by Rabia Sohail</span></h1>
          <div className="flex items-center mb-6">
            <Input
            type="number"
            id="duration"
            placeholder="Enter duration in secods"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 ml-15  mr-15 text-2xl justify-between text-center font-bold text-gray-800 dark:text-gray-200"/>
            <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-red-400 dark:text-gray-800 font-extrabold pb-4 pt-4 ">
              Set
            </Button>
          </div>
          <div className="text-6xl text-center font-bold text-green-600 dark:text-gray-200 mb-6">
            {formate(timeLeft)}
          </div>
          <div className="flex justify-center gap-4">
            <Button
            onClick={handleStart}
            variant="outline"
            className="text-blue-600 font-extrabold dark:text-gray-200">
              {isPaused?"Resume":"Start"}
            </Button>
            <Button
            onClick={handlePaused}
            variant="outline"
            className="text-blue-600 font-extrabold dark:text-gray-200">
              Pause
            </Button>
            <Button
            onClick={handleReset}
            variant="outline"
            className="text-blue-600 font-extrabold dark:text-gray-200">
              Reset
            </Button>
          </div>
      </div>
    </div>
   )
}