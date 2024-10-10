import React, { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { th } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { convertThaiDateNoTime } from "@/lib/thai-date";

const DateRangeSelect = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const [minMaxDate, setMinMaxDate] = useState<{ min: Date; max: Date }>({
    min: new Date(),
    max: new Date(),
  });
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted

  useEffect(() => {
    getMinMaxDate();
  }, []);

  useEffect(() => {
    setIsMounted(true); // Mark the component as mounted
  }, []);

  const getMinMaxDate = () => {
    fetch("http://localhost:3001/api/min-max-date")
      .then((res) => res.json())
      .then((data) => {
        setMinMaxDate(data);
        console.log(data);
      });
  };

  return (
    <div className={cn("grid gap-2")}>
      {isMounted && (
        <>
          <span>{new Date(minMaxDate.min).toUTCString()}</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {convertThaiDateNoTime(date.from)} -{" "}
                      {convertThaiDateNoTime(date.to)}
                    </>
                  ) : (
                    convertThaiDateNoTime(date.from)
                  )
                ) : (
                  <span>เลือกวันที่</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                locale={th}
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </>
      )}
      {/* {new Date(minMaxDate.min).toLocaleDateString()}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {convertThaiDateNoTime(date.from)} -{" "}
                  {convertThaiDateNoTime(date.to)}
                </>
              ) : (
                convertThaiDateNoTime(date.from)
              )
            ) : (
              <span>เลือกวันที่</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            locale={th}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover> */}
    </div>
  );
};

export default DateRangeSelect;
