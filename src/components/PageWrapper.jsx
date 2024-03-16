'use client'

import { useState, useEffect } from 'react';
import Upload from "@/components/Upload";

import dynamic from "next/dynamic";

const Plots = dynamic(() => import("../components/Plots"), {
    ssr: false,
});


export default function PageWrapper({ children }) {

    const [plotData, setPlotData] = useState(null);
    const [inputFiles, setInputFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const submitFiles = (e) => {
        e.preventDefault();

        setLoading(true);

        setPlotData(null);

        // Create a FormData instance to assemble the data
        const formData = new FormData();

        // Append each file to the form data
        inputFiles.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });

        formData.append('isSwitchOn', isSwitchOn);
        // Send the request with the form data
        fetch("/back/visualize", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPlotData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error uploading files:", error);
                setLoading(false);
            });
    };


    return (
        <>
            <Upload onSubmit={submitFiles} inputFiles={inputFiles} setInputFiles={setInputFiles} loading={loading} setLoading={setLoading} isSwitchOn={isSwitchOn} setIsSwitchOn={setIsSwitchOn} />
            {
                inputFiles.length > 0 && (
                    inputFiles.map((file, index) => (
                        <>
                            {loading &&
                                <div key={index} className='flex flex-col w-full h-56 bg-slate-200 animate-pulse rounded-xl gap-4 my-4 p-5 items-center justify-center font-bold text-lg'>
                                    {/* <p>Loading...</p> */}
                                    <p>{file.name}</p>
                                </div>
                            }
                        </>
                    ))
                )
            }
            {plotData && plotData.map((plot, index) => (
                <div className='flex flex-col w-full h-full gap-1 my-8' key={index}>
                    <Plots data={JSON.parse(plot)} title={inputFiles[index].name.split('.')[0]} file={inputFiles[index]} isSwitchOn={isSwitchOn} />
                </div>
            ))}
        </>
    );
}
