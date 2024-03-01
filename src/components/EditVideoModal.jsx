import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, FileUploader, Input, Loader } from "./index";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useForm, Controller } from "react-hook-form";
import { useUpdateAVideo } from "../features/videoApi";
import { toast } from "react-toastify";

const EditVideoModal = ({ setEditVideoModal, video }) => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: video ? video?.title : "",
      description: video ? video?.description : "",
      thumbnail: [],
    },
  });

  const { mutateAsync: updateVideoApi, isPending: updatingVideo } =
    useUpdateAVideo({ videoId: video?._id });

  const onUpdateVideoSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", data.thumbnail[0]);

    try {
      const response = await updateVideoApi({ ...data, formData });
      if (response) {
        toast.success(response?.message);
        setEditVideoModal(false);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <section className="absolute z-[99999] left-0 top-0 right-0 bottom-0 bg-dark-2 bg-opacity-70 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-light-1 dark:bg-dark-1 rounded-lg">
        {updatingVideo ? (
          <Loader />
        ) : (
          <>
            <div className="flex items-center justify-between p-3 border-b border-b-light-2 dark:border-b-dark-2">
              <h5 className="font-medium text-lg text-dark-1 dark:text-light-1 flex items-center gap-2">
                <PencilSquareIcon className="w-6 h-6" />
                Edit Video
              </h5>
              <Button
                bgColor="bg-transparent"
                textColor="text-dark-2 dark:text-light-2"
                className="pl-0 pt-0 pr-0 pb-0"
                onClick={() => setEditVideoModal(false)}>
                <XMarkIcon className="w-6 h-6" />
              </Button>
            </div>

            <form
              onSubmit={handleSubmit(onUpdateVideoSubmit)}
              className="w-full h-[500px] rounded-lg overflow-x-hidden overflow-y-auto p-3 bg-light-1 dark:bg-dark-1 flex flex-col justify-start gap-3">
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
                      mediaUrl={video?.thumbnail.url}
                    />
                  )}
                />
              </div>
              <div>
                <Input
                  label="Title"
                  placeholder="Enter a video title"
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
                  placeholder="Enter a video description"
                  className="border text-dark-1 dark:text-light-1 border-dark-2 dark:border-light-2 bg-transparent outline-none focus:outline-none rounded-lg px-3 py-2"
                  {...register("description", { required: true })}></textarea>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => setEditVideoModal(false)}>Cancel</Button>
                <Button type="submit">Update</Button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default EditVideoModal;
