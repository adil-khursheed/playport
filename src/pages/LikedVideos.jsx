import { useGetLikedVideos } from "../features/likeApi";
import { Loader, VideoPostCard } from "../components/index";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";

const LikedVideos = () => {
  const { data: likedVideosData, isLoading } = useGetLikedVideos();
  console.log(likedVideosData);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-full overflow-x-hidden overflow-y-auto p-3">
          <h2 className="text-xl text-dark-1 dark:text-light-1 flex items-center gap-2 mb-5 font-medium">
            <HandThumbUpIcon className="w-7 h-7" />
            Liked Videos
            <span className="text-dark-2 dark:text-light-2 text-lg font-normal">
              ({likedVideosData?.data.length})
            </span>
          </h2>
          {likedVideosData?.data.length <= 0 ? (
            <div className="w-full h-full flex items-center justify-center text-dark-2 dark:text-light-2 text-lg font-medium">
              <p>No liked videos!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {likedVideosData?.data.map((likedVideo) => (
                <VideoPostCard
                  key={likedVideo?._id}
                  video={likedVideo?.video}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LikedVideos;
