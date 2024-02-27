import { useCallback, useState } from "react";
import { Button } from "./index";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const VideoUploader = ({ fieldChange }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4"],
    },
    maxFiles: 1,
  });
  return (
    <div
      {...getRootProps()}
      className="flex flex-col justify-center items-center border border-gray-200 rounded-lg p-5 cursor-pointer">
      <input {...getInputProps()} />
      {fileUrl ? (
        <>
          <div>
            <video>
              <source src={fileUrl} />
            </video>
          </div>
          <p className="text-sm text-gray-400 p-4 w-full text-center">
            Click or drag photo to replace
          </p>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <ArrowUpTrayIcon className="w-10 h-10" />
          <h3 className="text-gray-400 text-base mb-2 mt-4">
            Drag and drop video files to upload
          </h3>
          <Button type="button" className={"h-12 px-5 text-sm"}>
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
