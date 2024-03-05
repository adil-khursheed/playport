import { Loader, VideoPostCard } from "../components";
import { ThemeState } from "../context/ThemeContext";
import { useGetUserWatchHistory } from "../features/authApi";

const History = () => {
  const { theme } = ThemeState();
  const { data: historyVideos, isLoading } = useGetUserWatchHistory();
  console.log(historyVideos);
  return (
    <>
      {isLoading ? (
        <Loader className="w-full h-full flex items-center justify-center" />
      ) : (
        <div className="w-full h-full overflow-x-hidden overflow-y-auto p-3">
          <h2 className="text-xl text-dark-1 dark:text-light-1 flex items-center gap-2 mb-5 font-medium">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.97 16.95L10 13.87V7H12V12.76L16.03 15.25L14.97 16.95ZM22 12C22 17.51 17.51 22 12 22C6.49002 22 2.00002 17.51 2.00002 12H3.00002C3.00002 16.96 7.04002 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3C8.81002 3 5.92002 4.64 4.28002 7.38C4.17002 7.56 4.06002 7.75 3.97002 7.94C3.96002 7.96 3.95002 7.98 3.94002 8H8.00002V9H1.96002V3H2.96002V7.74C3.00002 7.65 3.03002 7.57 3.07002 7.49C3.18002 7.27 3.30002 7.07 3.42002 6.86C5.22002 3.86 8.51002 2 12 2C17.51 2 22 6.49 22 12Z"
                fill={`${theme === "dark" ? "#FFFFFF" : "#0F0F0F"}`}
              />
            </svg>
            History
            <span className="text-dark-2 dark:text-light-2 text-lg font-normal">
              ({historyVideos?.data.length})
            </span>
          </h2>

          {historyVideos?.data.length <= 0 ? (
            <div className="w-full h-full flex items-center justify-center text-dark-2 dark:text-light-2 text-lg font-medium">
              <p>No liked videos!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {historyVideos?.data.map((video) => (
                <VideoPostCard key={video?._id} video={video} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default History;
