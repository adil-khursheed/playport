import { FolderIcon } from "@heroicons/react/24/solid";
import { useGetUserPlaylists } from "../../features/playlistApi";
import { Loader, PlaylistCard } from "../index";

const PlaylistTab = ({ userId }) => {
  const { data: playlistData, isLoading: playlistLoading } =
    useGetUserPlaylists(userId);
  return (
    <>
      {playlistLoading ? (
        <Loader />
      ) : (
        <>
          {playlistData?.data?.length > 0 ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {playlistData?.data?.map((playlist) => (
                <PlaylistCard key={playlist._id} playlist={playlist} />
              ))}
            </div>
          ) : (
            <div className="max-w-96 w-full mx-auto text-center flex flex-col items-center justify-center gap-2 mt-10 text-dark-2 dark:text-light-2">
              <FolderIcon className="w-8 h-8" />
              <h5>No playlist created</h5>
              <p>There are no playlist created on this channel.</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PlaylistTab;
