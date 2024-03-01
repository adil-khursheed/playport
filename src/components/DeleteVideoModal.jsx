import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDeleteVideo } from "../features/videoApi";
import { Button } from "./index";
import { toast } from "react-toastify";

const DeleteVideoModal = ({ video, setDeleteVideoModal }) => {
  const { mutateAsync: deleteVideoApi, isPending: deletingVideo } =
    useDeleteVideo({ videoId: video?._id });

  const onDeleteHandler = async () => {
    try {
      const response = await deleteVideoApi();
      if (response) {
        toast.success(response?.message);
        setDeleteVideoModal(false);
      }
    } catch (error) {
      toast.error(error?.message);
      setDeleteVideoModal(false);
    }
  };

  return (
    <section className="absolute z-[99999] top-0 left-0 right-0 bottom-0 bg-dark-2 bg-opacity-70 flex items-center justify-center px-3">
      <div className="max-w-lg w-full bg-light-1 dark:bg-dark-1 rounded-lg px-4 py-5 flex flex-col justify-start gap-5">
        <div className="w-full flex items-start justify-between">
          <div className="w-10 h-10 rounded-full bg-red-light text-red-dark flex items-center justify-center">
            <TrashIcon className="w-6 h-6" />
          </div>
          <div className="text-dark-1 dark:text-light-1 max-w-96">
            <h3 className="text-xl font-medium">Delete Video</h3>
            <p className="text-sm">
              Are you sure you want to delete this video? Once its deleted, you
              will not be able to recover it.
            </p>
          </div>
          <div
            className="text-dark-1 dark:text-light-1 cursor-pointer"
            onClick={() => setDeleteVideoModal(false)}>
            <XMarkIcon className="w-6 h-6" />
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-2">
          <Button
            bgColor="bg-transparent"
            textColor="text-dark-1 dark:text-light-1"
            className="pt-4 pb-4 border border-dark-1 dark:border-light-1"
            onClick={() => setDeleteVideoModal(false)}>
            Cancel
          </Button>
          <Button
            bgColor="bg-red-dark"
            textColor="text-light-1"
            className="pt-4 pb-4 w-full flex items-center justify-center gap-2"
            onClick={onDeleteHandler}>
            {deletingVideo ? (
              <>
                <span className="w-5 h-5 rounded-full border-2 border-dark-1 border-b-light-2 dark:border-light-1 dark:border-b-dark-2 animate-spin"></span>
                <span>Deleting</span>
              </>
            ) : (
              <span className="w-full text-center">Delete</span>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DeleteVideoModal;
