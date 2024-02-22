import { Link } from "react-router-dom";
import { multiFormatDateString } from "../utils/utils";
import {
  HandThumbUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HandThumbUpIcon as ThumbUpFill } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Button, CommentForm } from "./index";
import { useDeleteVideoComment } from "../features/commentApi";
import { toast } from "react-toastify";
import { useLikeUnlikeComment } from "../features/likeApi";

const Comments = ({ comment, currentUser }) => {
  const [commentEditable, setCommentEditable] = useState(false);

  const { mutateAsync: deleteVideoComment } = useDeleteVideoComment({
    commentId: comment._id,
  });

  const { mutateAsync: likeUnlikeComment } = useLikeUnlikeComment({
    commentId: comment._id,
  });

  const deleteVideoCommentHandler = async () => {
    const response = await deleteVideoComment();
    if (response) {
      toast.success(response?.message);
    }
  };

  const likeUnlikeVideoCommentHandler = async () => {
    const response = await likeUnlikeComment();
    if (response) {
      toast.success(response?.message);
    }
  };
  return (
    <div className="flex items-start gap-4 my-5">
      <Link to={`/profile/${comment?.owner?.username}`}>
        <div className="w-10 h-10 rounded-full">
          <img
            src={comment?.owner?.avatar?.url}
            alt={comment?.owner?.fullName}
            className="w-full h-full object-cover object-top rounded-full"
          />
        </div>
      </Link>
      {commentEditable ? (
        <>
          <CommentForm
            comment={comment}
            setEditableComment={setCommentEditable}
          />
          <Button
            textColor="text-light-1"
            bgColor="bg-dark-1"
            className="rounded-l-full rounded-r-full"
            onClick={() => setCommentEditable(false)}>
            Cancel
          </Button>
        </>
      ) : (
        <div className="flex flex-col justify-start gap-1">
          <div className="flex items-center gap-3 ">
            <Link
              to={`/profile/${comment?.owner?.username}`}
              className="text-dark-1 dark:text-light-1 font-medium text-sm">
              @{comment?.owner?.username}
            </Link>
            <p className="text-dark-2 dark:text-light-2 text-xs">
              {multiFormatDateString(comment?.createdAt)}
            </p>
            {comment?.updatedAt > comment?.createdAt && (
              <p className="text-xs text-dark-2 dark:text-light-2">(edited)</p>
            )}
            {currentUser?.data?._id === comment?.owner?._id && (
              <>
                <div
                  className="cursor-pointer"
                  onClick={() => setCommentEditable(true)}>
                  <PencilSquareIcon className="w-4 h-4 text-dark-2 dark:text-light-2" />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={deleteVideoCommentHandler}>
                  <TrashIcon className="w-4 h-4 text-dark-2 dark:text-light-2" />
                </div>
              </>
            )}
          </div>
          <div className="text-dark-2 dark:text-light-2 text-[15px]">
            <h3>{comment?.content}</h3>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="cursor-pointer"
              onClick={likeUnlikeVideoCommentHandler}>
              {comment?.isLiked ? (
                <ThumbUpFill className="w-4 h-4 text-dark-1 dark:text-light-1" />
              ) : (
                <HandThumbUpIcon className="w-4 h-4 text-dark-1 dark:text-light-1" />
              )}
            </div>
            <div className="text-dark-2 dark:text-light-2 text-xs">
              {comment?.likes} {comment?.likes === 1 ? "like" : "likes"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
