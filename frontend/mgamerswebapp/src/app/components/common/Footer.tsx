import { HeartIcon } from '@heroicons/react/24/outline'

export default function Footer() {

    return (
        <footer className="border-t border-gray-800 py-8">
            <div className="container mx-auto px-4 text-center text-gray-500">
                <p>&copy; 2025 MG Esport. All Rights Reserved.</p>
                <p className="text-sm mt-2">
                    Designed with <HeartIcon className='size-6 inline-block w-4 h-4 text-red-500'/> for the gaming community.
                </p>
            </div>
        </footer>
    );
}