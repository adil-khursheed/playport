import { useSearchParams } from "react-router-dom";
import { Loader, VideoPostList } from "../components/index";
import { useGetVideosByQuery } from "../features/videoApi";
import InfiniteScroll from "react-infinite-scroller";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query");

  const {
    data: searchedVideoData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetVideosByQuery(searchTerm);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          loadMore={fetchNextPage}
          hasMore={hasNextPage}
          pageStart={1}
          className="w-full px-3 py-2 overflow-x-hidden overflow-y-auto">
          {searchedVideoData?.pages.map((page, index) => (
            <div key={index}>
              {page?.data?.videos.map((video) => (
                <VideoPostList key={video._id} video={video} />
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
        </InfiniteScroll>
      )}
    </>
  );
};

export default SearchResult;
