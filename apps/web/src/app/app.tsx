import axios from 'axios';

export function App() {
  const handleDownloadWithBlob = async (size: number) => {
    const response = await axios({
      url: `http://localhost:3000/generate-file?size=${size}`,
      method: 'GET',
      responseType: 'blob',
    });

    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(response.data);
    a.download = `${size}MB-file.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 w-[600px] mx-auto py-1">
        <div>512mb</div>
        <a href="http://localhost:3000/generate-file?size=512">
          <button className="border px-2 rounded">
            Download using new tab
          </button>
        </a>
        <button
        className="border px-2 rounded"
        onClick={() => handleDownloadWithBlob(512)}
        >Download using blob</button>
      </div>

      <div className="grid grid-cols-3 w-[600px] mx-auto bg-neutral-50 py-1">
        <div>1024mb</div>
        <a href="http://localhost:3000/generate-file?size=1024">
          <button className="border px-2 rounded">
            Download using new tab
          </button>
        </a>
        <button className="border px-2 rounded">Download using blob</button>
      </div>

      <div className="grid grid-cols-3 w-[600px] mx-auto py-1">
        <div>2048mb</div>
        <a href="http://localhost:3000/generate-file?size=2048">
          <button className="border px-2 rounded">
            Download using new tab
          </button>
        </a>
        <button className="border px-2 rounded">Download using blob</button>
      </div>

      <div className="grid grid-cols-3 w-[600px] mx-auto bg-neutral-50 py-1">
        <div>3072mb</div>
        <a href="http://localhost:3000/generate-file?size=3072">
          <button className="border px-2 rounded">
            Download using new tab
          </button>
        </a>
        <button className="border px-2 rounded">Download using blob</button>
      </div>
    </div>
  );
}

export default App;
