import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Button, Loader, ToggleSwitch } from "../components";
import { useGetCurrentUser } from "../features/authApi";
import {
  useGetChannelStats,
  useGetChannelVideos,
} from "../features/dashboardApi";
import { EyeIcon, HeartIcon, UserIcon } from "@heroicons/react/24/solid";

const AdminDashboard = () => {
  const { data: currentUser, isLoading: currentUserLoading } =
    useGetCurrentUser();

  const { data: channelStatsData, isLoading: statsLoading } =
    useGetChannelStats();

  const { data: channelVideosData, isLoading: channelVideosLoading } =
    useGetChannelVideos();

  console.log(channelVideosData);

  if (currentUserLoading) {
    return <Loader />;
  }

  return (
    <>
      {statsLoading ? (
        <Loader />
      ) : (
        <section className="p-3 w-full flex flex-col justify-start gap-4">
          <div className="w-full flex items-center justify-between gap-2">
            <h2 className="text-lg md:text-3xl text-dark-1 dark:text-light-1 font-medium">
              Welcome Back, {currentUser?.data?.fullName}
            </h2>
            <Button className="flex items-center gap-2">
              <ArrowUpTrayIcon className="w-5 h-5" />
              <span>Upload Video</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="w-full border border-dark-2 dark:border-light-2 p-3 flex flex-col justify-start gap-3">
              <div>
                <EyeIcon className="w-5 h-5 text-dark-2 dark:text-light-2" />
              </div>
              <div className="text-dark-2 dark:text-light-2">
                <p>Total Views</p>
                <h4 className="font-semibold text-2xl">
                  {channelStatsData?.data?.totalViews}
                </h4>
              </div>
            </div>
            <div className="w-full border border-dark-2 dark:border-light-2 p-3 flex flex-col justify-start gap-3">
              <div>
                <UserIcon className="w-5 h-5 text-dark-2 dark:text-light-2" />
              </div>
              <div className="text-dark-2 dark:text-light-2">
                <p>Total Subscribers</p>
                <h4 className="font-semibold text-2xl">
                  {channelStatsData?.data?.totalSubscribers}
                </h4>
              </div>
            </div>
            <div className="w-full border border-dark-2 dark:border-light-2 p-3 flex flex-col justify-start gap-3">
              <div>
                <HeartIcon className="w-5 h-5 text-dark-2 dark:text-light-2" />
              </div>
              <div className="text-dark-2 dark:text-light-2">
                <p>Total Likes</p>
                <h4 className="font-semibold text-2xl">
                  {channelStatsData?.data?.totalLikes}
                </h4>
              </div>
            </div>
          </div>

          {channelVideosLoading ? (
            <Loader />
          ) : (
            <table className="table-auto border border-dark-2 dark:border-light-2">
              <thead className="border-b">
                <tr>
                  <th>Status</th>
                  <th>Uploaded</th>
                  <th>Rating</th>
                  <th>Uploaded Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {channelVideosData?.data.length > 0 ? (
                  <>
                    {channelVideosData?.data.map((video) => (
                      <tr key={video?._id}>
                        <td className="flex items-center gap-2">
                          <ToggleSwitch />
                          <p className={`${video?.isPublished ? "" : ""}`}>
                            {video?.isPublished ? "Published" : "Unpublished"}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <div>
                    <p>No video uploaded yet!!</p>
                  </div>
                )}
              </tbody>
            </table>
          )}
        </section>
      )}
    </>
  );
};

export default AdminDashboard;
