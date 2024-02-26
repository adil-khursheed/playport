import { Link } from "react-router-dom";
import { multiFormatDateString } from "../utils/utils";

const PlaylistCard = ({ playlist }) => {
  return (
    <Link to={`/playlists/${playlist?._id}`}>
      <div className="relative w-full h-44 aspect-video border border-light-2 dark:border-dark-2">
        <img
          src={playlist?.videos[0]?.thumbnail?.url}
          alt={playlist?.name}
          className="w-full h-full object-contain"
        />
        <div className="absolute left-0 right-0 bottom-0 bg-light-1 bg-opacity-50 backdrop-blur-[5px] py-[10px] px-4 text-dark-2 font-medium">
          <div className="flex items-center justify-between gap-2">
            <p>Playlist</p>
            <p>
              {playlist?.videos?.length}{" "}
              {playlist?.videos?.length <= 1 ? "video" : "videos"}
            </p>
          </div>
          <p className="text-sm">
            {multiFormatDateString(playlist?.createdAt)}
          </p>
        </div>
      </div>
      <div className="text-dark-2 dark:text-light-2 mt-1">
        <h3 className="font-medium text-base">{playlist?.name}</h3>
        <p className="text-sm">
          {playlist?.description.substring(0, 50).concat("...")}
        </p>
      </div>
    </Link>
  );
};

export default PlaylistCard;
