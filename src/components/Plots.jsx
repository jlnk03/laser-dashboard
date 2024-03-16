'use client'

import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { TextInput } from '@tremor/react';
import DownloadButton from './DownloadButton';


export default function Plots({ data, title = "Plot", file, isSwitchOn }) {

    const [plotTitle, setPlotTitle] = useState(title);

    function handleTitleChange(e) {
        setPlotTitle(e);
    }

    return (
        <>
            <div className='flex flex-col w-full gap-2'>
                <div className='flex flex-row w-full justify-between items-end'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="plotTitle" className="text-xs text-slate-500">Plot Title</label>
                        {/* <input type="text" value={plotTitle} onChange={handleTitleChange} className="w-96 p-2 mb-4 text-black h-8 rounded-md border border-slate-500" />  */}
                        <TextInput id="plotTitle" value={plotTitle} onValueChange={handleTitleChange}  type='text' className='w-96'/>
                    </div>
                    <DownloadButton title={plotTitle} file={file} isSwitchOn={isSwitchOn} />
                </div>
                <Plot data={data.data} layout={data.layout} />
            </div>
        </>
    );
}
