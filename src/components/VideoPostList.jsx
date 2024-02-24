import { Link } from "react-router-dom";
import { multiFormatDateString } from "../utils/utils";

const VideoPostList = ({ video }) => {
  return (
    <Link
      to={`/videos/${video?._id}`}
      className=" w-full flex items-start gap-5 mb-5">
      <div className="w-64 h-44 rounded-lg border border-light-2 dark:border-dark-2">
        <img
          src={video?.thumbnail?.url}
          alt={video?.title}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
      <div className="flex-1 flex flex-col justify-start gap-5">
        <div>
          <h2 className="font-medium text-xl text-dark-1 dark:text-light-1">
            {video?.title}
          </h2>
          <p className="text-dark-2 dark:text-light-2 text-sm flex items-center gap-1">
            {video?.views > 0 && (
              <span>
                {video?.views} {video?.views === 1 ? "view" : "views"}
              </span>
            )}
            <span className="font-bold mt-[1px]">&middot;</span>
            <span>{multiFormatDateString(video?.createdAt)}</span>
          </p>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-8 h-8 rounded-full">
            <img
              src={video?.owner?.avatar?.url}
              alt={video?.owner?.fullName}
              className="w-full h-full object-cover object-top rounded-full"
            />
          </div>
          <div className="text-dark-2 dark:text-light-2 text-sm">
            <p>{video?.owner?.fullName}</p>
          </div>
        </div>
        <div className="text-dark-2 dark:text-light-2 text-xs">
          <p>{video?.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoPostList;
