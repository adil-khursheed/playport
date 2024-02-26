import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { VideoPostCard, Loader } from "../index";

const VideoTab = ({ userVideosLoading, userVideos }) => {
  return (
    <>
      {userVideosLoading ? (
        <Loader />
      ) : (
        <>
          {userVideos?.pages?.map((page, index) => (
            <div key={index} className="w-full">
              {page?.data?.videos.length > 0 ? (
                <div
                  key={index}
                  className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {page?.data?.videos.map((video) => (
                    <VideoPostCard key={video?._id} video={video} />
                  ))}
                </div>
              ) : (
                <div className="max-w-96 w-full mx-auto text-center flex flex-col items-center justify-center gap-2 mt-10 text-dark-2 dark:text-light-2">
                  <PlayCircleIcon className="w-8 h-8" />
                  <h5>No videos uploaded</h5>
                  <p>
                    This page has yet to upload a video. Search another page in
                    order to find more videos.
                  </p>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default VideoTab;
