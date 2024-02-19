import { useParams } from "react-router-dom";
import { useGetVideoById } from "../features/videoApi";
import { Button, Comments, Input, Loader } from "../components";
import { BellIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import {
  BellAlertIcon,
  HandThumbUpIcon as ThumbUpFill,
} from "@heroicons/react/24/solid";
import { useGetCurrentUser } from "../features/authApi";
import { multiFormatDateString } from "../utils/utils";
import { useGetVideoComments } from "../features/commentApi";

const VideoDetails = () => {
  const { videoId } = useParams();

  const { data: video, isLoading, isError, error } = useGetVideoById(videoId);
  const { data: currentUser, isLoading: currentUserLoading } =
    useGetCurrentUser();

  const { data: commentsData, isLoading: commentsLoading } =
    useGetVideoComments(videoId);
  console.log(commentsData);

  if (isError) {
    return <p className="text-center">{error?.message}</p>;
  }
  return (
    <>
      {isLoading || currentUserLoading || commentsLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-full overflow-x-hidden overflow-y-auto">
          <div className="max-w-5xl w-full mx-auto py-5 px-3">
            <video
              autoPlay
              controls
              controlsList="nodownload"
              disablePictureInPicture
              poster={video?.data?.thumbnail?.url}
              className="w-full h-[250px] sm:h-[350px] md:h-[500px] aspect-video rounded-xl shadow-sm shadow-light-2 dark:shadow-dark-2 border border-light-2 dark:border-dark-2">
              <source src={video?.data?.videoFile?.url} />
            </video>

            <h2 className="text-2xl text-dark-1 dark:text-light-1 font-semibold mt-3">
              {video?.data?.title}
            </h2>

            <div className="mt-3 flex items-center gap-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full">
                  <img
                    src={video?.data?.owner?.avatar?.url}
                    alt={video?.data?.owner?.fullName}
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>
                <div>
                  <h4 className="text-dark-1 dark:text-light-1 text-base font-semibold">
                    {video?.data?.owner?.fullName}
                  </h4>
                  {video?.data?.owner?.subscribersCount > 0 && (
                    <p className="text-dark-2 dark:text-light-2 text-sm font-medium">
                      {video?.data?.owner?.subscribersCount}{" "}
                      {video?.data?.owner?.subscribersCount === 1
                        ? "subscriber"
                        : "subscribers"}
                    </p>
                  )}
                </div>
              </div>
              <Button
                bgColor="bg-transparent"
                className="border border-light-2 dark:border-dark-2 rounded-r-full rounded-l-full w-20 grid grid-cols-2">
                {video?.data?.isLiked ? (
                  <ThumbUpFill className="w-6 h-6 text-dark-1 dark:text-light-1" />
                ) : (
                  <HandThumbUpIcon className="w-6 h-6 text-dark-1 dark:text-light-1" />
                )}
                <p className="text-dark-1 dark:text-light-1">
                  {video?.data?.likes}
                </p>
              </Button>
              {currentUser?.data?._id !== video?.data?.owner?._id && (
                <Button
                  bgColor={`${
                    video?.data?.owner?.isSubscribed
                      ? "bg-light-2 dark:bg-dark-2"
                      : "bg-transparent"
                  }`}
                  textColor="text-dark-1 dark:text-light-1"
                  className="px-4 flex items-center gap-1 border border-light-2 dark:border-dark-2 rounded-r-full rounded-l-full">
                  {video?.data?.owner?.isSubscribed ? (
                    <BellAlertIcon className="w-6 h-6" />
                  ) : (
                    <BellIcon className="w-6 h-6" />
                  )}
                  <span className="font-medium">
                    {video?.data?.owner?.isSubscribed
                      ? "Subscribed"
                      : "Subscribe"}
                  </span>
                </Button>
              )}
            </div>

            <div className="w-full bg-light-2 dark:bg-dark-2 mt-3 rounded-lg px-3 py-2 flex flex-col justify-start gap-2">
              <div className="flex items-center gap-10 font-semibold text-dark-2 dark:text-light-1">
                {video?.data?.views > 0 && (
                  <p>
                    {video?.data?.views}{" "}
                    {video?.data?.views === 1 ? "view" : "views"}
                  </p>
                )}

                <p>{multiFormatDateString(video?.data?.createdAt)}</p>
              </div>
              <div className="text-dark-2 dark:text-light-1 font-medium">
                <p>{video?.data?.description}</p>
              </div>
            </div>

            <div className="mt-3 w-full bg-light-2 dark:bg-dark-2 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full">
                  <img
                    src={currentUser?.data?.avatar.url}
                    alt={currentUser?.data?.fullName}
                    className="w-full h-full rounded-full object-cover object-top"
                  />
                </div>
                <form className="flex-1">
                  <Input
                    placeholder="Add a comment"
                    className="bg-transparent text-dark-1 dark:text-light-1 border-t-none"
                  />
                </form>
              </div>

              <div>
                {commentsData?.pages.map((page, index) => (
                  <div key={index}>
                    {page?.data?.comments?.length > 0 ? (
                      page?.data?.comments.map((comment) => (
                        <Comments key={comment._id} comment={comment} />
                      ))
                    ) : (
                      <div className="w-full h-52 grid place-items-center text-lg text-dark-2 dark:text-light-2 font-semibold">
                        <p>No comments yet</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoDetails;
