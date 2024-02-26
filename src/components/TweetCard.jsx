import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as ThumbUpFill } from "@heroicons/react/24/solid";
import { multiFormatDateString } from "../utils/utils";
import { Button, Loader } from "./index";
import { useLikeUnlikeTweets } from "../features/likeApi";
import { toast } from "react-toastify";

const TweetCard = ({ tweet }) => {
  const { mutateAsync: likeUnlikeTweet, isPending: likeUnlikeTweetLoading } =
    useLikeUnlikeTweets({ tweetId: tweet?._id });

  const likeUnlikeTweetHandler = async () => {
    const response = await likeUnlikeTweet();
    if (response) {
      toast.success(response?.message);
    }
  };
  return (
    <div className="flex items-start gap-4 my-4 border-b border-b-light-2 dark:border-b-dark-2 py-3">
      <div className="w-16 h-16 rounded-full">
        <img
          src={tweet?.owner?.avatar?.url}
          alt={tweet?.owner?.fullName}
          className="w-full h-full object-cover object-top rounded-full"
        />
      </div>

      <div className="flex-1 flex flex-col justify-start gap-2">
        <div className="flex items-center gap-8">
          <h3 className="capitalize font-medium text-lg text-dark-2 dark:text-light-2">
            {tweet?.owner?.fullName}
          </h3>
          <p className="text-sm text-light-2">
            {multiFormatDateString(tweet?.createdAt)}
          </p>
        </div>

        <div className="text-dark-2 dark:text-light-2 font-normal">
          <p>{tweet?.content}</p>
        </div>

        <Button
          bgColor="bg-transparent"
          textColor="text-dark-2 dark:text-light-2"
          className="pl-0 pt-0 pr-0 pb-0 flex items-center gap-3"
          onClick={likeUnlikeTweetHandler}>
          {likeUnlikeTweetLoading ? (
            <Loader />
          ) : (
            <>
              {tweet?.isLiked ? (
                <ThumbUpFill className="w-6 h-6" />
              ) : (
                <HandThumbUpIcon className="w-6 h-6" />
              )}

              {tweet?.likes > 0 && (
                <span>
                  {tweet?.likes} {tweet?.likes === 1 ? "like" : "likes"}
                </span>
              )}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default TweetCard;
