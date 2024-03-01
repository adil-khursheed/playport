import { ArrowUpTrayIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import { VideoPostCard, Loader, Button } from "../index";

const VideoTab = ({
  userVideosLoading,
  userVideos,
  currentUserId,
  profileUserId,
  setUploadVideoModal,
}) => {
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
                <div className="max-w-96 w-full mx-auto text-center flex flex-col items-center justify-center gap-2 my-5 text-dark-2 dark:text-light-2">
                  <PlayCircleIcon className="w-8 h-8" />
                  <h5>No videos uploaded</h5>
                  <p>
                    This page has yet to upload a video. Search another page in
                    order to find more videos.
                  </p>
                  {currentUserId === profileUserId && (
                    <Button
                      bgColor="bg-dark-2 dark:bg-light-2"
                      textColor="text-light-1 dark:text-dark-2"
                      className="flex items-center gap-2 mt-2"
                      onClick={() => setUploadVideoModal(true)}>
                      <ArrowUpTrayIcon className="w-4 h-4" />
                      <span>New Video</span>
                    </Button>
                  )}
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
