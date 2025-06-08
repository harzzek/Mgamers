'use client'

import UpdateUserInformationForm from "@/app/components/forms/EditUserInformationForm";
import { UpdateUserDTO } from "@/DTOs/updateUserInfoDTO";
import { updateUserById } from "@/stores/userStore";
import { Divider } from "@heroui/react";
import { useState } from "react";
import { useParams } from 'next/navigation';

export default function EditUser() {
    const [created, setCreated] = useState(false);
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const handleSubmit = async (data: UpdateUserDTO) => {
        try {
            if (id) {
                await updateUserById(Number(id), data);
                setCreated(true);
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    <UpdateUserInformationForm userId={Number(id)} onSubmit={handleSubmit} submitted={created} />
                </div>
                <div className="col-span-1">
                    <div className="bg-secondary-100 p-6 shadow-md mb-3">
                        <h1>
                            Bruger Information
                        </h1>
                        <p className="mb-4">
                            Hvis du vil have din bruger slettet, kontakt en admin.
                        </p>
                        <Divider/>
                        <p className="mt-3 mb-4">
                            Vi bruger generelt kun din bruger data til at kunne identificere dig.
                            Du har også muligheden for at tilføje ekstra information om dig selv.
                            Postnummer og addresse bliver kun brugt til at fører statestik over, hvor vores
                            medlemmer er bosat (ude eller indenfor Ballerup kommune). Du kan til enhver tid opdatere denne infromation.
                        </p>
                        <Divider/>
                        <p className="mt-3 mb-4">
                            Hvis du ombestemmer dig for at vi ikke må holde din information, kan du blot opdatere feltet uden indhold (Tomt felt).
                            Din information vil derefter kun befinde sig i vores database backups i en måned.
                            Efter næste backup rotation vil dataen blive slettet for evigt.
                        </p>
                        <Divider/>
                        <p className="mt-3 mb-4">
                            Ved at trykke opdater information, med din information i felterne, tillader du
                            at vi må opbevarer den gældene information i vores database. Samt opbevarer dataen
                            i vores backups i en måned.
                        </p>
                        <Divider/>
                        <p className="mt-3 mb-4">
                            I tilfælde af spørgsmål omkring, hvordan din bruger information bliver opbevaret,
                            så kan du række ud til Hans Christian Leth-Nissen. Du finder ham under brugere.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );

}