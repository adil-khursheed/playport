import {
  ArrowUpTrayIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  DeleteVideoModal,
  EditVideoModal,
  Loader,
  ToggleSwitch,
  UploadVideoModal,
} from "../components";
import { useGetCurrentUser } from "../features/authApi";
import {
  useGetChannelStats,
  useGetChannelVideos,
  useTogglePublishStatus,
} from "../features/dashboardApi";
import { EyeIcon, HeartIcon, UserIcon } from "@heroicons/react/24/solid";
import { convertDateFormat } from "../utils/utils";
import { toast } from "react-toastify";
import React, { useState } from "react";

const AdminDashboard = () => {
  const [uploadVideoModal, setUploadVideoModal] = useState(false);
  const [editVideoModal, setEditVideoModal] = useState(false);
  const [video, setVideo] = useState(null);
  const [deleteVideoModal, setDeleteVideoModal] = useState(false);

  const { data: currentUser, isLoading: currentUserLoading } =
    useGetCurrentUser();

  const { data: channelStatsData, isLoading: statsLoading } =
    useGetChannelStats();

  const { data: channelVideosData, isLoading: channelVideosLoading } =
    useGetChannelVideos();

  const { mutateAsync: togglePublishApi } = useTogglePublishStatus();

  const onTogglePublishHandler = async (videoId) => {
    try {
      const response = await togglePublishApi({ videoId });
      if (response) {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const onEditClickHandler = (video) => {
    setVideo(video);
    setEditVideoModal(true);
  };

  const onDeleteClickHandler = (video) => {
    setVideo(video);
    setDeleteVideoModal(true);
  };

  if (currentUserLoading) {
    return (
      <Loader className="w-full h-full flex justify-center items-center" />
    );
  }

  return (
    <>
      {statsLoading ? (
        <Loader className="w-full h-full flex justify-center items-center" />
      ) : (
        <section className="p-3 w-full flex flex-col justify-start gap-4 overflow-x-hidden overflow-y-auto">
          <div className="w-full flex items-center justify-between gap-2">
            <h2 className="text-lg md:text-3xl text-dark-1 dark:text-light-1 font-medium">
              Welcome Back, {currentUser?.data?.fullName}
            </h2>
            <Button
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-base"
              onClick={() => setUploadVideoModal(true)}>
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
                  {channelStatsData?.data
                    ? channelStatsData?.data?.totalViews
                    : "0"}
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
                  {channelStatsData?.data
                    ? channelStatsData?.data?.totalSubscribers
                    : "0"}
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
                  {channelStatsData?.data
                    ? channelStatsData?.data?.totalLikes
                    : "0"}
                </h4>
              </div>
            </div>
          </div>

          {channelVideosLoading ? (
            <Loader />
          ) : (
            <>
              {channelVideosData?.data.length > 0 ? (
                <table className="table-auto border border-dark-2 dark:border-light-2">
                  <thead className="border-b border-b-dark-2 dark:border-b-light-2">
                    <tr className="text-dark-1 dark:text-light-1">
                      <th className="p-4">Status</th>
                      <th className="p-4">Uploaded</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4">Uploaded Date</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {channelVideosData?.data.map((video) => (
                      <React.Fragment key={video?._id}>
                        <tr>
                          <td className="flex items-center gap-2 px-3 py-2">
                            <ToggleSwitch
                              checked={video?.isPublished}
                              onChange={() =>
                                onTogglePublishHandler(video?._id)
                              }
                            />
                            <p
                              className={`${
                                video?.isPublished
                                  ? "text-green-1 border-green-1"
                                  : "text-orange-1 border-orange-1"
                              } px-2 py-1 rounded-full border w-full text-center`}>
                              {video?.isPublished ? "Published" : "Unpublished"}
                            </p>
                          </td>
                          <td className="text-center text-dark-1 dark:text-light-1">
                            {video?.title}
                          </td>
                          <td className="text-center">
                            <p className="bg-green-light text-green-1 px-2 py-1 rounded-full">
                              {video?.likes}{" "}
                              {video?.likes === 1 ? "like" : "likes"}
                            </p>
                          </td>
                          <td className="text-center text-dark-1 dark:text-light-1">
                            <p>{convertDateFormat(video?.createdAt)}</p>
                          </td>
                          <td className="flex items-center justify-center gap-2">
                            <Button
                              bgColor="bg-transparent"
                              textColor="text-dark-1 dark:text-light-1"
                              className="pl-0 pt-0 pr-0 pb-0"
                              onClick={() => onEditClickHandler(video)}>
                              <PencilIcon className="w-5 h-5" />
                            </Button>
                            <Button
                              bgColor="bg-transparent"
                              textColor="text-dark-1 dark:text-light-1"
                              className="pl-0 pt-0 pr-0 pb-0"
                              onClick={() => onDeleteClickHandler(video)}>
                              <TrashIcon className="w-5 h-5" />
                            </Button>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="w-full h-40 text-dark-2 dark:text-light-2 border border-dark-2 dark:border-light-2 flex items-center justify-center text-lg font-semibold">
                  <p>No video uploaded yet!!</p>
                </div>
              )}
            </>
          )}

          {uploadVideoModal && (
            <UploadVideoModal setUploadVideoModal={setUploadVideoModal} />
          )}

          {editVideoModal && (
            <EditVideoModal
              setEditVideoModal={setEditVideoModal}
              video={video}
            />
          )}

          {deleteVideoModal && (
            <DeleteVideoModal
              setDeleteVideoModal={setDeleteVideoModal}
              video={video}
            />
          )}
        </section>
      )}
    </>
  );
};

export default AdminDashboard;
