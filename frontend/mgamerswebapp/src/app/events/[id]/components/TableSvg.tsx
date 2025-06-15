'use client'
import { Table } from '../../interfaces/event';
import { Seat } from '../../interfaces/event';
import { SeatSvg } from './SeatSvg';
import {
    VERTICAL_SEAT_SPACING,
    DISTANCE_FROM_TABLE,
    SEAT_WIDTH,
    SEAT_HEIGHT,
    TABLE_WIDTH,
    SEAT_VERTICAL_GAP,
} from '../constants/layout';
import { useAuth } from '@/context/AuthContext';
import { extendSeat } from '@/stores/eventStore';

interface TableSvgProps {
    table: Table;
    x: number;
    y: number;
    width: number;
    height: number;
    tableindex: number;
    eventid: number;
    onSeatClick: (seatId: number) => void;
    fetchEvent: () => void;

}

export const TableSvg = (table: TableSvgProps) => {
    const { user } = useAuth();
    const tablelocation = table.tableindex % 4;

    const ifOnlyOneSeatIsOccupied = (seats: Seat[]) => {
        let occupiedSeats = 0;
        seats.forEach(seat => {
            if(seat.occupied){
                occupiedSeats++;
            }
        });
        return occupiedSeats == 1;
    }

    const handleSeatExtension = async (seats: Seat[]) => {
        try {
            const seatedUserId = seats.find(seat => seat.occupied)!.user!.id;
            const seatId = seats.find(seat => !seat.occupied)!.id;
            console.log(seatedUserId, table.eventid, [seatId]);
            await extendSeat(seatedUserId, table.eventid, [seatId]);
        } catch (err) {
            console.error(err);
        } finally {
            table.fetchEvent();
        }

    }

    const calculateSeatPositionX = (): number => {
        if(tablelocation == 0 || tablelocation == 2){
            return table.x - DISTANCE_FROM_TABLE - SEAT_WIDTH;
            
        } else{
            return table.x + TABLE_WIDTH + DISTANCE_FROM_TABLE;
        } 
    }

    const calculateSeatPositionY = (seat : Seat) => {
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
        <g>
            
            {user?.userRoles.includes('Admin') && ifOnlyOneSeatIsOccupied(table.table.seats) ? 
                <rect x={table.x} y={table.y} width={table.width} height={table.height} fill={"yellow"} rx="1" className='cursor-pointer'
                onClick={() => handleSeatExtension(table.table.seats)} /> 
                :
                <rect x={table.x} y={table.y} width={table.width} height={table.height} fill={"gray"} rx="1" />
            }
            {table.table.seats.map((seat, index) => {

                return (
                    <SeatSvg key={seat.id} seat={seat} x={calculateSeatPositionX()} y={ calculateSeatPositionY(seat)} width={SEAT_WIDTH} height={SEAT_HEIGHT} onSeatClick={table.onSeatClick} seatIndex={index} tableIndex={table.tableindex}>
                    </SeatSvg>
                );
            })
            }
        </g>
    );

}