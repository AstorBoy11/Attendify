"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { add, format } from "date-fns";
import { type Locale, enUS } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { DayPicker, type DayPickerProps } from "react-day-picker";

export type DateTimePickerProps = {
    value?: Date;
    onChange?: (date: Date) => void;
    onMonthChange?: (month: Date) => void;
    hourCycle?: 12 | 24;
    yearRange?: number;
    disabled?: boolean;
    displayFormat?: { hour24?: string; hour12?: string };
    granularity?: "day" | "hour" | "minute" | "second";
    placeholder?: string;
    defaultPopupValue?: Date;
    className?: string;
    id?: string;
} & Pick<DayPickerProps, "locale" | "weekStartsOn" | "showWeekNumber" | "showOutsideDays">;

type DateTimePickerRef = { value?: Date } & Omit<HTMLButtonElement, "value">;

const DateTimePicker = React.forwardRef<Partial<DateTimePickerRef>, DateTimePickerProps>(
    (
        {
            locale = enUS,
            defaultPopupValue = new Date(new Date().setHours(0, 0, 0, 0)),
            value,
            onChange,
            onMonthChange,
            hourCycle = 24,
            yearRange = 50,
            disabled = false,
            displayFormat,
            granularity = "second",
            placeholder = "Pick a date",
            className,
            id,
            ...props
        },
        ref,
    ) => {
        const [month, setMonth] = React.useState<Date | undefined>(value);
        const [open, setOpen] = React.useState(false);
        const [date, setDate] = React.useState<Date | undefined>(value);

        React.useEffect(() => {
            setDate(value);
        }, [value]);

        const handleDateSelect = (selectedDate: Date | undefined) => {
            if (!selectedDate) {
                setDate(undefined);
                onChange?.(undefined as any);
                return;
            }

            let newDateTime = selectedDate;
            if (date) {
                newDateTime.setHours(date.getHours(), date.getMinutes(), date.getSeconds());
            }
            setDate(newDateTime);
            onChange?.(newDateTime);
        };



        const formattedDate = date
            ? format(
                date,
                displayFormat?.hour24 && hourCycle === 24
                    ? displayFormat.hour24
                    : displayFormat?.hour12 && hourCycle === 12
                        ? displayFormat.hour12
                        : hourCycle === 24
                            ? "PPP HH:mm"
                            : "PPP hh:mm a",
                { locale: locale as Locale },
            )
            : placeholder;

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id={id}
                        variant="outline"
                        className={cn(
                            "w-[280px] justify-start text-left font-normal truncate",
                            !date && "text-muted-foreground",
                            className,
                        )}
                        ref={ref as any}
                        disabled={disabled}
                        {...props}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formattedDate}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        month={month}
                        onMonthChange={onMonthChange || setMonth}
                        disabled={disabled}
                        locale={locale}
                        initialFocus
                        {...props}
                    />
                    <div className="p-3 border-t border-border">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Time</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Select
                                disabled={!date}
                                value={date ? format(date, "HH") : undefined}
                                onValueChange={(val) => {
                                    if (!date) return;
                                    const newDate = new Date(date);
                                    newDate.setHours(parseInt(val));
                                    setDate(newDate);
                                    onChange?.(newDate);
                                }}
                            >
                                <SelectTrigger className="w-[70px]">
                                    <SelectValue placeholder="HH" />
                                </SelectTrigger>
                                <SelectContent position="popper" className="h-[200px]">
                                    {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0")).map((h) => (
                                        <SelectItem key={h} value={h}>
                                            {h}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <span className="text-muted-foreground">:</span>
                            <Select
                                disabled={!date}
                                value={date ? format(date, "mm") : undefined}
                                onValueChange={(val) => {
                                    if (!date) return;
                                    const newDate = new Date(date);
                                    newDate.setMinutes(parseInt(val));
                                    setDate(newDate);
                                    onChange?.(newDate);
                                }}
                            >
                                <SelectTrigger className="w-[70px]">
                                    <SelectValue placeholder="MM" />
                                </SelectTrigger>
                                <SelectContent position="popper" className="h-[200px]">
                                    {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0")).map((m) => (
                                        <SelectItem key={m} value={m}>
                                            {m}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    },
);

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
