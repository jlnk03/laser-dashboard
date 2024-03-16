'use client'
import React, { useReducer, useState } from 'react';
import { Switch } from '@tremor/react';


export default function Upload({ onSubmit, inputFiles, setInputFiles, loading, setLoading, isSwitchOn, setIsSwitchOn }) {

    const [dragActive, setDragActive] = useState(false);
    // const [isSwitchOn, setIsSwitchOn] = useState(false);

    const noInput = inputFiles.length === 0;

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === 'dragenter' || e.type === 'dragover');
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files) {
            setInputFiles([...inputFiles, ...Array.from(e.target.files)]);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files) {
            // dispatch(addFilesToInput(Array.from(e.dataTransfer.files)));
            // setInputFiles(Array.from(e.dataTransfer.files));
            setInputFiles([...inputFiles, ...Array.from(e.target.files)]);
        }
    };


    return (
        <>
            <form
                onDragEnter={handleDrag}
                className='flex flex-col h-full w-full gap-4 mb-4'
                onSubmit={(e) => onSubmit(e)}
            >

                <label
                    htmlFor="dropzone-file"
                    className={`group relative flex flex-col items-center justify-center w-full border-2 border-slate-300 border-dashed rounded-lg dark:border-gray-600 transition ${dragActive ? 'border-blue-500 bg-blue-200' : ''} h-56 w-full hover:border-blue-500 hover:bg-blue-100`}
                >

                    <div
                        className={`relative w-full h-full flex flex-col items-center justify-center}`}
                    >
                        <div
                            className={
                                `relative w-full h-full flex flex-col items-center justify-center ${!noInput ? 'items-start' : ''}`
                            }
                        >
                            <>
                                <div
                                    className="absolute inset-0 cursor-pointer"
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                />

                                <svg
                                    aria-hidden="true"
                                    className="w-10 h-10 mb-3 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    ></path>
                                </svg>

                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag
                                    and drop
                                </p>
                                <input
                                    multiple
                                    onChange={handleChange}
                                    accept="image/bmp"
                                    id="dropzone-file"
                                    type="file"
                                    // webkitdirectory
                                    // directory
                                    className="hidden"
                                    disabled={loading}
                                />
                            </>

                        </div>
                    </div>
                </label>

                <div className='flex flex-row w-full justify-between'>

                    <div className="flex items-center space-x-3">
                        <Switch checked={isSwitchOn} onChange={() => setIsSwitchOn(!isSwitchOn)} />
                        <label htmlFor="switch" className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                            8060
                        </label>
                    </div>

                    <div className='flex flex-row w-full justify-end gap-4'>

                        {/* clear files */}
                        <button
                            type="button"
                            onClick={() => setInputFiles([])}
                            disabled={noInput || loading}
                            className="bg-white hover:bg-slate-100 font-bold py-2 px-4 rounded-full w-fit border"
                        >
                            Clear Files
                        </button>

                        <button
                            type="submit"
                            disabled={noInput || loading}
                            className="bg-black hover:bg-black/80 font-bold py-2 px-4 rounded-full w-fit border text-white"
                        >
                            Submit Files
                        </button>
                    </div>

                </div>

            </form>

            {
                !noInput && (
                    <div className="flex flex-col w-full h-full">
                        <div className="sm:-mx-6 lg:-mx-8">
                            <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-slate-400 text-xs">
                                        <thead className="bg-slate-100">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium   uppercase tracking-wider"
                                                >
                                                    Size
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="relative divide-y divide-slate-400">
                                            {inputFiles.map((file, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {file.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {
                                                            (file.size / 1000000).toFixed(2)
                                                        }MB
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
