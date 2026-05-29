import { UploadCloud } from "lucide-react";

const UploadBox = ({ selectedFile, setSelectedFile, handleFileChange }) => {
  return (
    <div className="border border-dashed border-white/10 rounded-2xl p-5 text-center">
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
        <UploadCloud size={20} />
      </div>

      {!selectedFile ? (
        <>
          <h3 className="text-base font-semibold">Upload Audio</h3>

          <p className="text-gray-500 mt-2 text-xs">
            MP3, WAV and M4A supported
          </p>

          <input
            type="file"
            accept=".mp3,.wav,.m4a"
            id="audioFile"
            className="hidden"
            onChange={handleFileChange}
          />

          <label
            htmlFor="audioFile"
            className="inline-block mt-4 px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:scale-105 transition cursor-pointer"
          >
            Choose File
          </label>
        </>
      ) : (
        <div>
          <h3 className="text-base font-semibold">File Selected</h3>

          <p className="text-gray-300 mt-3 break-all text-sm">
            {selectedFile.name}
          </p>

          <button
            onClick={() => setSelectedFile(null)}
            className="mt-4 px-4 py-2 rounded-full border border-white/10 text-xs hover:bg-white/10 transition"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadBox;
