'use client'
import { useEffect, useState, useContext } from 'react';


interface TableSvgProps {
    x: number;
    y: number;
    seatId: number;
    isReserved: boolean;
    onClick: (seatId: number) => void;
}

const TableSvg = ({x, y, seatId, isReserved, onClick}: TableSvgProps) => {

    const [reserved, setReserved] = useState(false);
    
    const handleSeatClick = (seatId: number) => {
        console.log(`Seat ${seatId} clicked`);
    }

    return (
        <rect
        x={x}
        y={y}
        width="50"
        height="50"
        fill={isReserved ? "red" : "green"}
        stroke="black"
        strokeWidth="1"
        onClick={() => onClick(seatId)}
        />
    );
    
}