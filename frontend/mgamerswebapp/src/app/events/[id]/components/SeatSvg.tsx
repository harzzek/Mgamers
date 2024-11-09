import React from 'react';
import { Seat } from '../../interfaces/event';
import {
    SEAT_WIDTH,
} from '../constants/layout';

interface SeatSvgProps {
    seat: Seat;
    x: number;
    y: number;
    width: number;
    height: number;
    onSeatClick: (seatId: number) => void;
}


export const SeatSvg = (seatProps: SeatSvgProps) => {

    const [isSelected, setIsSelected] = React.useState(false);

    let userNameOnSeat = '';

    const color = () => {
        if (seatProps.seat.occupied) {
            userNameOnSeat = seatProps.seat.user?.username ?? '';
            return "red";
        } else if(isSelected){
            return "blue";

        } else {
            return "green";
        }
    }

    return (
        <g>
            <rect x={seatProps.x} y={seatProps.y} width={seatProps.width} height={seatProps.height} fill={color()} className='cursor-pointer'
                onClick={() => {
                    if (!seatProps.seat.occupied) {
                        setIsSelected(!isSelected);
                        seatProps.onSeatClick(seatProps.seat.id)
                    }
                }}
            >
            </rect>
            <text x={seatProps.x + SEAT_WIDTH/8} y={seatProps.y + SEAT_WIDTH/4} fontSize="2" fill="white">{userNameOnSeat}</text>
        </g>

    );
}