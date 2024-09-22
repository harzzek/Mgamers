import Image from "next/image";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
        <div className="w-full aspect-auto">
          <div className="columns-2 ">
          <div>
            This is a start
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </div>
          <div>
            <h1>Header</h1>
            <p>Paragraph</p>
          </div>
        </div>
      </div>
    </div>
    
    
  );
}
