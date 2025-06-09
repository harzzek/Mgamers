import React from 'react';
import { Seat } from '../../interfaces/event';
import {
    SEAT_HEIGHT,
    SEAT_WIDTH,
} from '../constants/layout';

interface SeatSvgProps {
    seat: Seat;
    x: number;
    y: number;
    width: number;
    height: number;
    onSeatClick: (seatId: number) => void;
    seatIndex: number;
    tableIndex: number;
}


export const SeatSvg = (seatProps: SeatSvgProps) => {

    const [isSelected, setIsSelected] = React.useState(false);

    let userNameOnSeat = '';

    const color = () => {
        if (seatProps.seat.occupied) {
            //Red
            userNameOnSeat = seatProps.seat.user?.username ?? '';
            if (userNameOnSeat.length > 12) {
                userNameOnSeat = userNameOnSeat.slice(0, 12) + "...";
            }
            return "#1a1212";
        } else if (isSelected) {
            //Blue
            return "#3F51B5";
        } else {
            //Green
            return "#8BC34A";
        }
    }

    const calculateRelativeId = (tableIndex: number, seatIndex: number): number => {
        if (seatIndex == 0) {
            return (tableIndex + 1) * 2 - 1
        } else {
            return (tableIndex + 1) * 2
        }
    }

    // If true, then chairs are to the left
    // If false, then charirs are right
    const faced = (tableIndex: number): boolean => {

        const columnNumber = tableIndex % 4;
        if (columnNumber === 0) {
            return true;
        } else if (columnNumber === 1) {
            return false;
        } else if (columnNumber === 2) {
            return true;
        } else {
            return false;
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
            {faced(seatProps.tableIndex) ?
                <text x={seatProps.x + SEAT_WIDTH} y={seatProps.y + SEAT_HEIGHT - SEAT_HEIGHT / 7} fontSize={Math.max(2, Math.min(6, 6 - (userNameOnSeat.length / 3)))} textAnchor='end' fill='white'>
                    {userNameOnSeat}
                </text>
                :
                <text x={seatProps.x + 1} y={seatProps.y + SEAT_HEIGHT - SEAT_HEIGHT / 7} fontSize={Math.max(2, Math.min(6, 6 - (userNameOnSeat.length / 3)))} fill='white'>
                    {userNameOnSeat}
                </text>
            }
            <text x={seatProps.x + SEAT_WIDTH - 1} y={seatProps.y + 1} textAnchor='end' dominantBaseline='hanging' fontSize="2" fill="white" className='cursor-pointer'
                onClick={() => {
                    if (!seatProps.seat.occupied) {
                        setIsSelected(!isSelected);
                        seatProps.onSeatClick(seatProps.seat.id)
                    }
                }}
            >{calculateRelativeId(seatProps.tableIndex, seatProps.seatIndex)}</text>
        </g>

    );
}