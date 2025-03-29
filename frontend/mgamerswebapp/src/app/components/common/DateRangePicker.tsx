"use client"

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/globals.css";

interface DateRangePickerProps {
    dateRange: [Date | null, Date | null];
    setDateRange: (range: [Date | null, Date | null]) => void;
}


export default function DateRangePicker({ dateRange, setDateRange } : DateRangePickerProps) {
    const [startDate, endDate] = dateRange

    return (
        <div className="mt-2 w-full rounded-md text-neutral-950 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <DatePicker
                dateFormat="dd/MM/yyyy"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                        setDateRange(update as [Date | null, Date | null]);
                        console.log(update[0]?.getDate());
                        console.log(update[0]?.toISOString());
                    }
                }

                className="border rounded-lg p-2 text-gray-900 "
            />
        </div>
    );
}