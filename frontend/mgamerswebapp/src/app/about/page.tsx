'use client';
import { fetchFile } from "@/stores/fileStore";


const AboutUsPage: React.FC = () => {

    const FileDownloadButton = ({ filename }: { filename: string }) => {
        const handleDownload = () => {
            fetchFile(filename);
        };

        return <button className="text-primary-600" onClick={handleDownload}>Download {filename}</button>;
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary-100 p-6 shadow-md mb-3">
                    <h1>Velkommen til MGamers Esport
                        Dit Gamerfællesskab!
                    </h1>
                    <p>
                        Hos MGamers Esport byder vi velkommen
                        til et unikt og inkluderende fællesskab
                        for gamere i alle aldre! Uanset om du er passioneret omkring esport,
                        elsker brætspil eller bare vil hygge dig i godt selskab, så har vi noget for dig.
                        Vi har været en del af den danske gamingverden i mere end 15 år,
                        og vi er stolte af at være en af Danmarks ældste og mest etablerede gamingforeninger.
                    </p>
                </div>
                <div className="bg-primary-100 p-6 shadow-md">
                    <h1>
                        Hvad gør os unikke?
                    </h1>

                    <ul className="space-y-6">
                        <li>
                            <h3>Gaming på alle niveauer</h3>
                            <p>Vi tilbyder alt fra afslappede gaming-sessions til konkurrencer og esport-events, hvor du kan udfordre dig selv og andre.</p>
                        </li>
                        <li>
                            <h3>LAN-events</h3>
                            <p>Deltag i vores legendariske LAN-events, hvor vi skaber rammerne for 46 timers sjov, gaming og fællesskab. Alt er klar til dig – borde, strøm, internetkabler og en lynhurtig 1 Gbit forbindelse.</p>
                        </li>
                        <li>
                            <h3>Fællesskab og hygge</h3>
                            <p>MGamers Esport er ikke kun om gaming – vi spiller også brætspil, hygger os og møder ligesindede med samme passion.</p>
                        </li>
                        <li>
                            <h3>For børn, unge og voksne</h3>
                            <p>Vi er åbne for alle fra 12 år og opefter, og vi har fokus på et trygt og inkluderende miljø for alle medlemmer.</p>
                        </li>
                    </ul>
                </div>
                <div className="bg-primary-100 p-6 shadow-md mb-3">
                    <h2 className="text-3xl font-bold mb-6">Om foreningen</h2>
                    <p className="mb-6">
                        MG Esport er en LAN-forening med base i Måløv for børn, unge og voksne fra 7. klasse (fyldt 13 år) og op. Idéen bag MG Esport løber mere end 10 år tilbage, hvor pædagoger og forældre ønskede at fylde et lokale med unge mennesker med hang til computerspil og nørderi. Her over 10 år senere eksisterer foreningen stadig og har en let stigning i antallet af medlemmer hvert år.
                    </p>
                    <p className="mb-6">
                        Foreningen er godkendt af Ballerup kommune og der arbejdes på et tættere samarbejde med kommunen i 2024, bl.a. i forhold til de eksisterende sommerferieaktiviteter for børn og unge i hele kommunen.
                    </p>
                    <p className="mb-6">
                        MG Esport er altså computerspil, brætspil, hygge og meget mere. Om du lige har købt din første begynder computer eller spillekonsol eller om du ligger ind med en farverig MEGA-computer med nyeste grafikkort og 5.000 timers CSGO er for os underordnet. Her er det hyggen, et godt grin og fællesskabet med andre med samme interesse, der betyder noget.
                    </p>
                    <p className="mb-6">
                        MG Esport medlemmer udgør et af landets absolut mest afslappede og hyggeligste LAN’s. Vi mødes en gang om måneden, medbringer hver især computer, konsol, VR eller forskellige brætspil og udkæmper kampe internt og eksternt i 46 timer ad gangen fra fredag til søndag.
                    </p>
                    <p className="mb-6">
                        MG Esport handler også om god etikette og sund fornuft såvel online som offline. Vi sørger altid for rummelighed og respekt for hinandens forskellighed. Vi indbyder alle medlemmer til at overholde reglerne for god og sportslig opførsel og tillader ikke råben og skrigen af skældsord eller lignende under arrangementerne. I øvrigt hjælper vi gerne hinanden med råd og vejledning i spil eller blot sund fornuft og måder at handle på ved fx uønskede henvendelser eller lignende.
                    </p>
                    <p className="mb-6">
                        Til gengæld kan du se frem til 46 timers sjov, indimellem også konkurrencer med forskellige præmier. Som noget nyt vil vi forsøge at udvikle vores eget sommer-cricket, men har du tanker om spil eller andet, er vi altid åbne for nye forslag og muligheder.
                    </p>
                    <p className="mb-6">
                        Ved ethvert arrangement forsøger vi altid at spise sammen lørdag aften. Det gør glæden større og maden billigere og ikke at forglemme, så er der altid gratis morgenmad lørdag og søndag.
                    </p>
                    <p className="mb-6">
                        MG Esport Crew består af medlemmer trænet i at opsætte et LAN på under 1 time og pakke ned på den halve tid. Har du lyst, kan du blive medlem af dette Crew og lære lidt om opsætning af netværk, strømføring, sikring mod interferens og meget mere.
                    </p>

                </div>
                <div className="bg-primary-100 p-6 shadow-md mb-3">
                    <h2 className="text-3xl font-bold mb-6">Dokumenter</h2>
                    <ul>
                        <li>
                            <FileDownloadButton filename="generalforsamling.pdf" />
                        </li>
                        <li>
                            <FileDownloadButton filename="privatlivspolitik.pdf" />
                        </li>
                        <li>
                            <FileDownloadButton filename="vedtaegter.pdf" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AboutUsPage;