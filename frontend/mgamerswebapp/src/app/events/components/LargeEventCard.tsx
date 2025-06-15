import { Event } from '../interfaces/event';
import { CalendarDateRangeIcon } from '@heroicons/react/24/outline'
import { ClockIcon } from '@heroicons/react/24/outline'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';

type EventCardProps = {
    event: Event;
    buttonShow: boolean;

}

export default function LargeEventCard({ event, buttonShow }: EventCardProps): JSX.Element {

    return (
        <div className="bg-primary-200 rounded-xl shadow-lg flex flex-col hover:transition-shadow transition-transform duration-300 hover:-translate-y-1 overflow-hidden
             hover:shadow-secondary">
            <div className="p-6 flex-grow">
                <h3>{event.name}</h3>
                <div className='p-1'>
                    <p className='text-gray-400 mb-6 h-20'>
                        {event.description}
                    </p>
                </div>


                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                        <CalendarDateRangeIcon className='w-5 h-5 text-red-400' />
                        <span><span className="font-semibold">Dato:</span> {event.startDate.toLocaleDateString()} - {event.endDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ClockIcon className='w-5 h-5 text-red-400' />
                        <span><span className="font-semibold">Tid:</span> {event.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPinIcon className='w-5 h-5 text-red-400' />
                        <span><span className="font-semibold">Location:</span> {event.location}</span>
                    </div>
                </div>


            </div>
            {buttonShow &&
                <div className="bg-primary-50 p-4">
                    <Button
                        as={Link}
                        href={`/events/${event.id}`}
                        color="secondary"
                        className='w-full font-semibold'
                    >
                        Tilmeld
                    </Button>
                </div>
            }


        </div>
    );
}