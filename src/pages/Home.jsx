import { useEffect } from "react";
import { Loader, VideoPostCard } from "../components";
import { useGetAllVideos } from "../features/videoApi";

const Home = () => {
  const {
    data: videoData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetAllVideos();

  useEffect(() => {
    const fetchMoreHandler = () => {
      try {
        if (
          window.innerHeight +
            document.getElementById("home__page").scrollTop +
            1 >=
            document.getElementById("home__page").scrollHeight &&
          !isFetching &&
          hasNextPage
        ) {
          fetchNextPage();
        }
      } catch (error) {
        console.log(error);
      }
    };

    document
      .getElementById("home__page")
      ?.addEventListener("scroll", fetchMoreHandler);

    return () => {
      document.removeEventListener("scroll", fetchMoreHandler);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          id="home__page"
          className="w-full h-full overflow-x-hidden overflow-y-auto p-3">
          {videoData.pages.map((page, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {page?.data?.videos.map((video) => (
                <VideoPostCard key={video._id} video={video} />
              ))}
            </div>
          ))}

          {isFetching && hasNextPage && (
            <Loader className="flex justify-center items-center" />
          )}
          {!hasNextPage && (
            <p className="text-center text-dark-2 dark:text-light-2 text-sm mt-5">
              No more data!!
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
