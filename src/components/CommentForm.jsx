import { useForm, Controller } from "react-hook-form";
import {
  useAddVideoComments,
  useUpdateVideoComments,
} from "../features/commentApi";
import { Button, Loader } from "./index";
import { toast } from "react-toastify";

const CommentForm = ({ videoId, comment, setEditableComment }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      content: comment?.content || "",
    },
  });

  const { mutateAsync: createComment, isPending: createCommentLoading } =
    useAddVideoComments(videoId);

  const { mutateAsync: updateComment, isPending: updateCommentLoading } =
    useUpdateVideoComments({ commentId: comment?._id });

  const onCommentSubmit = async (data) => {
    if (comment) {
      const updateCommentResponse = await updateComment(data.content);
      if (updateComment) {
        toast.success(updateCommentResponse?.message);
        setEditableComment(false);
      }
    } else {
      const response = await createComment(data.content);
      if (response) {
        toast.success(response.message);
        reset();
      }
    }
  };
  return (
    <form
      className="w-full flex items-center gap-2"
      onSubmit={handleSubmit(onCommentSubmit)}>
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder="Add a comment"
            className="w-full h-9 bg-transparent text-dark-1 dark:text-light-1 border-b border-b-dark-2 dark:border-b-light-2 outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onCommentSubmit)();
              }
            }}
          />
        )}
      />
      <Button
        type="submit"
        textColor="text-light-1"
        bgColor="bg-dark-1"
        className="rounded-l-full rounded-r-full">
        {createCommentLoading || updateCommentLoading ? (
          <Loader />
        ) : comment ? (
          "Edit"
        ) : (
          "Comment"
        )}
      </Button>
    </form>
  );
};

export default CommentForm;
