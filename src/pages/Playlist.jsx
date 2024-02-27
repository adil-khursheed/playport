import { Link, useParams } from "react-router-dom";
import { useGetPlaylistById } from "../features/playlistApi";
import { Loader } from "../components";
import { multiFormatDateString } from "../utils/utils";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

const Playlist = () => {
  const { playlistId } = useParams();

  const { data: playlistData, isLoading: playlistLoading } =
    useGetPlaylistById(playlistId);
  console.log(playlistData);
  return (
    <>
      {playlistLoading ? (
        <Loader />
      ) : (
        <div className="w-full flex flex-col lg:flex-row items-start gap-3 px-3 py-2">
          <div className="flex items-start flex-col md:flex-row lg:flex-col gap-2 lg:max-w-96">
            <div className="relative w-full h-44 aspect-video border border-light-2 dark:border-dark-2 rounded-md">
              <img
                src={playlistData?.data?.videos[0]?.thumbnail?.url}
                alt={playlistData?.data?.name}
                className="w-full h-full object-contain"
              />
              <div className="absolute left-0 right-0 bottom-0 bg-light-1 bg-opacity-50 backdrop-blur-[5px] py-[10px] px-4 text-dark-2 font-medium rounded-b-md">
                <div className="flex items-center justify-between gap-2">
                  <p>Playlist</p>
                  <p>
                    {playlistData?.data?.videos?.length}{" "}
                    {playlistData?.data?.videos?.length <= 1
                      ? "video"
                      : "videos"}
                  </p>
                </div>
                <p className="text-sm">
                  {multiFormatDateString(playlistData?.data?.createdAt)}
                </p>
              </div>
            </div>
            <div className="text-dark-2 dark:text-light-2 mt-1">
              <h3 className="font-medium text-base">
                {playlistData?.data?.name}
              </h3>
              <p className="text-sm">
                {playlistData?.data?.description
                  .substring(0, 120)
                  .concat("...more")}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col justify-start gap-5">
            {playlistData?.data?.videos.length > 0 ? (
              <>
                {playlistData?.data?.videos.map((video) => (
                  <Link
                    to={`/videos/${video?._id}`}
                    key={video?._id}
                    className="flex items-start gap-3">
                    <div className="w-48 h-32 aspect-video rounded-md border border-light-2 dark:border-dark-2">
                      <img
                        src={video?.thumbnail?.url}
                        alt={video?.title}
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>
                    <div className="w-full flex flex-col justify-start gap-3">
                      <h3 className="text-dark-2 dark:text-light-2 font-medium">
                        {video?.title}
                      </h3>
                      <p className="flex items-center gap-1 text-sm text-dark-2 dark:text-light-2">
                        {video?.views > 0 && (
                          <>
                            <span>
                              {video?.views}{" "}
                              {video?.views === 1 ? "view" : "views"}
                            </span>
                            <span>&middot;</span>
                          </>
                        )}
                        <span>{multiFormatDateString(video?.createdAt)}</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <div>
                <PlayCircleIcon className="w-4 h-5" />
                <p>No videos in playlist.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Playlist;
