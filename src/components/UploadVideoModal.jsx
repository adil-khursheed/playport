import { toast } from "react-toastify";
import { useUploadAVideo } from "../features/videoApi";
import { Button, FileUploader, Input } from "./index";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { CheckCircleIcon, FilmIcon } from "@heroicons/react/24/solid";
import { bytesToMB } from "../utils/utils";

const UploadVideoModal = ({ setUploadVideoModal }) => {
  const [videoSize, setVideoSize] = useState(0);
  const [videoName, setVideoName] = useState("");
  const { register, handleSubmit, control } = useForm();

  const {
    mutateAsync: uploadVideoApi,
    isPending: uploadingVideo,
    isSuccess: videoUploaded,
  } = useUploadAVideo();

  const onVideoSubmit = async (data) => {
    setVideoName(data.videoFile[0].name);
    setVideoSize(data.videoFile[0].size);

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("videoFile", data.videoFile[0]);

    try {
      const response = await uploadVideoApi(formData);
      if (response) {
        toast.success(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute z-[999999] left-0 top-0 right-0 bottom-0 bg-dark-2 bg-opacity-80 flex items-center justify-center p-3">
      <div className="max-w-3xl w-full mx-auto py-2 bg-light-1 dark:bg-dark-1 my-4 rounded-md">
        {uploadingVideo ? (
          <div className="w-full px-3 text-dark-1 dark:text-light-1">
            <h3 className="text-lg">Uploading Video...</h3>
            <p>Track your video uploading process.</p>
            <div className="w-full p-3 border border-dark-2 dark:border-light-2 text-dark-1 dark:text-light-1 flex items-start gap-4 rounded-lg">
              <div>
                <FilmIcon className="w-5 h-5" />
              </div>
              <div className="w-full flex flex-col justify-start gap-1">
                <h5>{videoName}</h5>
                <p>{bytesToMB(videoSize)} MB</p>
                <p className="w-full flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full border-2 border-dark-1 border-b-light-2 dark:border-light-1 dark:border-b-dark-2 animate-spin"></span>
                  <span>Uploading</span>
                </p>
              </div>
            </div>
          </div>
        ) : videoUploaded ? (
          <div className="w-full px-3 text-dark-1 dark:text-light-1">
            <h3 className="text-lg">Uploading Video...</h3>
            <div className="w-full p-3 border border-dark-2 dark:border-light-2 text-dark-1 dark:text-light-1 flex items-start gap-4 rounded-lg">
              <div>
                <FilmIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col justify-start gap-1">
                <h5>{videoName}</h5>
                <p>{bytesToMB(videoSize)} MB</p>
                <p className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5" />
                  <span>Uploading</span>
                </p>
              </div>
            </div>
            <Button
              className="w-full mt-2"
              onClick={() => setUploadVideoModal(false)}>
              Finish
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onVideoSubmit)}
            className="flex flex-col justify-start gap-2 w-full h-[500px] overflow-x-hidden overflow-y-auto px-3 bg-light-1 dark:bg-dark-1">
            <div className="flex items-center justify-between gap-2 py-3 border-b border-b-dark-2 dark:border-b-light-2">
              <h4 className="font-semibold text-lg text-dark-2 dark:text-light-2 flex items-center gap-2">
                <FilmIcon className="w-6 h-6" />
                Upload Video
              </h4>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => setUploadVideoModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </div>
            <div>
              <label className="text-dark-1 dark:text-light-1 font-medium">
                Video
              </label>
              <Controller
                name="videoFile"
                control={control}
                render={({ field }) => (
                  <FileUploader
                    fieldChange={field.onChange}
                    action={"videoUpload"}
                  />
                )}
              />
            </div>
            <div>
              <label className="text-dark-1 dark:text-light-1 font-medium">
                Thumbnail
              </label>
              <Controller
                name="thumbnail"
                control={control}
                render={({ field }) => (
                  <FileUploader
                    fieldChange={field.onChange}
                    action={"thumbnailUpload"}
                  />
                )}
              />
            </div>
            <div>
              <Input
                type="text"
                label="Title"
                className="pl-0 pr-0 dark:text-light-1"
                inputWrapperClassName="dark:border-light-2"
                labelClassName="text-dark-2 dark:text-light-2"
                {...register("title", { required: true })}
              />
            </div>
            <div className="flex flex-col justify-start gap-1">
              <label
                htmlFor="description"
                className="font-medium text-dark-2 dark:text-light-2">
                Description
              </label>
              <textarea
                id="description"
                className="border text-dark-1 dark:text-light-1 border-dark-2 dark:border-light-2 bg-transparent outline-none focus:outline-none rounded-lg px-3 py-2"
                {...register("description", { required: true })}></textarea>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UploadVideoModal;
