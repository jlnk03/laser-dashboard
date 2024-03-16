import Image from "next/image";
import dynamic from "next/dynamic";
import PageWrapper from "@/components/PageWrapper";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <section className="flex flex-col max-w-5xl w-full">
        <h1 className="text-4xl font-bold my-5">Höhenbildauswertung</h1>
        <PageWrapper />
      </section>
    </main>
  );
}
