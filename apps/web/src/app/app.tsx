import axios from 'axios';
import { useState } from 'react';

export function App() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 w-[600px] mx-auto py-1">
        <div>512mb</div>
        <DownloadFileWithUrl size={512} />
        <DownloadFileWithBlob size={512} />
      </div>

      <div className="grid grid-cols-3 w-[600px] mx-auto bg-neutral-50 py-1">
        <div>1024mb</div>
        <DownloadFileWithUrl size={1024} />
        <DownloadFileWithBlob size={1024} />
      </div>

      <div className="grid grid-cols-3 w-[600px] mx-auto py-1">
        <div>2048mb</div>
        <DownloadFileWithUrl size={2048} />
        <DownloadFileWithBlob size={2048} />
      </div>

      <div className="grid grid-cols-3 w-[600px] mx-auto bg-neutral-50 py-1">
        <div>3072mb</div>
        <DownloadFileWithUrl size={3072} />
        <DownloadFileWithBlob size={3072} />
      </div>
    </div>
  );
}

const DownloadFileWithUrl = ({ size }: { size: number }) => {
  return (
    <a href={`http://localhost:3000/generate-file?size=${size}`}>
      <button className="border px-2 rounded">Download using new tab</button>
    </a>
  );
};

type DownloadStatus = 'idle' | 'downloading' | 'finished';

const DownloadFileWithBlob = ({ size }: { size: number }) => {
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownloadWithBlob = async (size: number) => {
    setDownloadStatus('downloading');
    setDownloadProgress(0);

    const response = await axios({
      url: `http://localhost:3000/generate-file?size=${size}`,
      method: 'GET',
      responseType: 'blob',
      onDownloadProgress(progressEvent) {
        if (progressEvent.lengthComputable && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setDownloadProgress(percentCompleted);
        }
      },
    });

    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(response.data);
    a.download = `${size}MB-file.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDownloadStatus('finished');
  };

  return (
    <button
      className="border px-2 rounded"
      onClick={() => handleDownloadWithBlob(size)}
      disabled={downloadStatus === 'downloading'}
    >
      {downloadStatus === 'downloading' ? (
        <span>Downloading... {downloadProgress}%</span>
      ) : (
        'Download using blob'
      )}
    </button>
  );
};

export default App;
