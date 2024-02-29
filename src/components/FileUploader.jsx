import { useCallback, useState } from "react";
import { Button } from "./index";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const FileUploader = ({ fieldChange, mediaUrl, action }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl || "");

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
    maxFiles: 1,
  });
  return (
    <div
      {...getRootProps()}
      className="flex flex-col justify-center items-center border border-dark-2 dark:border-light-2 rounded-lg p-5 cursor-pointer">
      <input {...getInputProps()} />
      {fileUrl ? (
        <>
          <div>
            {action === "videoUpload" ? (
              <video>
                <source src={fileUrl} />
              </video>
            ) : (
              <img src={fileUrl} />
            )}
          </div>
          <p className="text-sm text-dark-2 dark:text-light-2 p-4 w-full text-center ">
            Click or drag {action === "videoUpload" ? "video" : "thumbnail"} to
            replace
          </p>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center text-dark-2 dark:text-light-2">
          <ArrowUpTrayIcon className="w-10 h-10" />
          <h3 className="text-gray-400 text-base mb-2 mt-4">
            Drag and drop{" "}
            {action === "videoUpload" ? "video files" : "thumbnail"} to upload
          </h3>
          <Button type="button" className={"h-12 px-5 text-sm"}>
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
