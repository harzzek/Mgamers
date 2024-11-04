'use client'
import { useEffect, useState, useContext } from 'react';
import { registration, Table } from '../../interfaces/event';
import { Seat } from '../../interfaces/event';
import { SeatSvg } from './SeatSvg';
import {
    VERTICAL_SEAT_SPACING,
    DISTANCE_FROM_TABLE,
    SEAT_WIDTH,
    SEAT_HEIGHT,
    TABLE_WIDTH,
    SEAT_VERTICAL_GAP
} from '../constants/layout';
//import { SeatSvg } from './SeatSvg';

interface TableSvgProps {
    table: Table;
    x: number;
    y: number;
    width: number;
    height: number;
    tableindex: number;
    onSeatClick: (seatId: number) => void;
}

export const TableSvg = (table: TableSvgProps) => {


    const tablelocation = table.tableindex % 4;

    const calculateSeatPositionX = (): number => {
        if(tablelocation == 0 || tablelocation == 2){
            return table.x - DISTANCE_FROM_TABLE - SEAT_WIDTH;
            
        } else{
            return table.x + TABLE_WIDTH + DISTANCE_FROM_TABLE;
        } 
    }

    const calculateSeatPositionY = (seat : Seat) => {
        const seats = table.table.seats;
        // Because we dont know which seat is first in the array then we need to check if the seat is odd or even.
        // Uneven is always the top seat
        if(seat.id % 2 == 1){
            //If seat one
            return table.y + SEAT_VERTICAL_GAP;

        } else {
            //If seat two
            return table.y + SEAT_VERTICAL_GAP +SEAT_HEIGHT + VERTICAL_SEAT_SPACING;

        }

        

    }

    return (
        <>
            <rect x={table.x} y={table.y} width={table.width} height={table.height} fill={"gray"} />
            {table.table.seats.map((seat) => {
                

                return (
                    <SeatSvg key={seat.id} seat={seat} x={calculateSeatPositionX()} y={ calculateSeatPositionY(seat)} width={SEAT_WIDTH} height={SEAT_HEIGHT} onSeatClick={table.onSeatClick}>
                    </SeatSvg>
                );
            })
            }
        </>
    );

}