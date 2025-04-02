"use client"

import React from "react";
import { DateRangePicker as Daterranger, DateValue, RangeValue } from "@heroui/react";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/globals.css";

interface DateRangePickerProps {
    dateRange: [Date | null, Date | null];
    setDateRange: (range: [Date | null, Date | null]) => void;
}


export default function DateRangePicker({ dateRange, setDateRange }: DateRangePickerProps) {
    const [startDate, endDate] = dateRange

    const handleDateChange = (value: RangeValue<DateValue> | null) => {
        if (value) {
            if (value.start && value.end) {
                console.log("Start Date:", value.start.toDate("Europe/Copenhagen"));
                console.log("End Date:", value.end.toDate("Europe/Copenhagen"));
                setDateRange([value.start.toDate("Europe/Copenhagen"), value.end.toDate("Europe/Copenhagen")])
            }
        }
    };

    return (
        <Daterranger
            isRequired
            className="w-full"
            label="Event Duration"
            labelPlacement="outside"
            onChange={handleDateChange}

        />
    );
}