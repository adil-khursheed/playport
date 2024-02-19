import { Link } from "react-router-dom";
import { formatTime, multiFormatDateString } from "../utils/utils";

const VideoPostCard = ({ video }) => {
  return (
    <div className="flex flex-col justify-start gap-3 mb-5">
      <Link to={`/videos/${video?._id}`}>
        <div className="relative w-full h-44 aspect-video md:h-56 rounded border border-light-2 dark:border-dark-2">
          <img
            src={video?.thumbnail?.url}
            alt={video?.title}
            className="w-full h-full object-contain rounded"
          />
          <div className="absolute bottom-1 right-1 bg-dark-2 px-1 py-[2px] font-semibold text-light-1 rounded-sm text-xs">
            <span>{formatTime(video?.duration)}</span>
          </div>
        </div>
      </Link>
      <div className="flex items-start gap-3">
        <Link to={`/profile/${video?.owner?.username}`}>
          <div className="w-10 h-10 rounded-full">
            <img
              src={video?.owner.avatar.url}
              alt={video?.owner.fullName}
              className="w-full h-full object-cover object-top rounded-full"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-start gap-[2px]">
          <h2 className="text-dark-1 dark:text-light-1 text-base font-medium">
            {video?.title}
          </h2>
          <Link to={`/profile/${video?.owner?.username}`}>
            <h4 className="text-sm text-dark-2 dark:text-light-2">
              {video?.owner.fullName}
            </h4>
          </Link>
          <p className="text-sm text-dark-2 dark:text-light-2 flex items-center gap-2">
            {video?.views > 0 && (
              <span>
                {video?.views} {video?.views === 1 ? "view" : "views"}
              </span>
            )}
            {video?.views > 0 && (
              <span className="font-bold text-md">&middot;</span>
            )}
            <span>{multiFormatDateString(video?.createdAt)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPostCard;
