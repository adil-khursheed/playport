import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { useGetUserTweets } from "../../features/tweetApi";
import { Loader, TweetCard } from "../index";

const TweetTab = ({ userId }) => {
  const { data: tweetsData, isLoading: tweetsLoading } =
    useGetUserTweets(userId);
  console.log(tweetsData);
  return (
    <>
      {tweetsLoading ? (
        <Loader />
      ) : (
        <>
          {tweetsData?.data?.length > 0 ? (
            <div className="w-full">
              {tweetsData?.data?.map((tweet) => (
                <TweetCard key={tweet?._id} tweet={tweet} />
              ))}
            </div>
          ) : (
            <div className="max-w-96 w-full mx-auto text-center flex flex-col items-center justify-center gap-2 mt-10 text-dark-2 dark:text-light-2">
              <ChatBubbleLeftRightIcon className="w-8 h-8" />
              <h5>No Tweets</h5>
              <p>
                This channel has yet to make a{" "}
                <span className="font-semibold">Tweet</span>.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TweetTab;
