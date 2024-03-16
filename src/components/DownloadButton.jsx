'use client'

import { useState } from 'react';
import { Button } from '@tremor/react';


export default function DownloadButton({ file, title, isSwitchOn }) {
    const [loading, setLoading] = useState(false);

    return (
        <Button
            loading={loading}
            onClick={async () => {
                setLoading(true);
                await handleDownload(file, title, isSwitchOn);
                setLoading(false);
            }
            }
            className="bg-white hover:bg-slate-100 font-bold py-2 px-4 w-fit border h-fit text-black rounded-tremor-full"
        >
            Download
        </Button>
    );
}

const handleDownload = async (file, title, isSwitchOn) => {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('isSwitchOn', isSwitchOn);

    const response = await fetch('/back/download', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        // Create a URL for the blob
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);

        // Create a link to download it
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${title}.pdf`;
        document.body.appendChild(link);
        link.click();

        // Clean up
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
    } else {
        console.error('Failed to download file.');
    }
};