import { useParams } from "react-router-dom";
import {
  useGetCurrentUser,
  useGetUserChannelProfile,
} from "../features/authApi";
import { Button, Loader } from "../components/index";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import { BellIcon } from "@heroicons/react/24/outline";

const Profile = () => {
  const { username } = useParams();

  const { data: currentUser, isLoading: currentUserLoading } =
    useGetCurrentUser();
  console.log(currentUser);

  const { data: profileData, isLoading: profileLoading } =
    useGetUserChannelProfile(username);
  console.log(profileData);

  return (
    <>
      {profileLoading || currentUserLoading ? (
        <Loader />
      ) : (
        <div className="max-w-5xl w-full mx-auto px-4 py-3 flex flex-col justify-start gap-3">
          <div className="w-full h-40 aspect-video rounded-lg border border-light-2 dark:border-dark-2">
            <img
              src={profileData?.data?.coverImage?.url}
              alt={profileData?.data?.fullName}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          <div className="flex items-start gap-6">
            <div className="w-36 h-w-36 rounded-full">
              <img
                src={profileData?.data?.avatar?.url}
                alt={profileData?.data?.fullName}
                className="w-full h-full object-cover object-top rounded-full"
              />
            </div>
            <div className="flex flex-col justify-start gap-3">
              <h1 className="text-dark-1 dark:text-light-1 font-semibold text-3xl capitalize">
                {profileData?.data?.fullName}
              </h1>
              <p className="flex items-center gap-3 text-dark-2 dark:text-light-2 text-base">
                <span>{profileData?.data?.username}</span>
                <span>&middot;</span>
                <span>
                  {profileData?.data?.subscribersCount}{" "}
                  {profileData?.data?.subscribersCount === 1
                    ? "subscriber"
                    : "subscribers"}
                </span>
                <span>&middot;</span>
                {profileData?.data?.uploadedVideosCount > 0 && (
                  <span>
                    {profileData?.data?.uploadedVideosCount}{" "}
                    {profileData?.data?.uploadedVideosCount === 1
                      ? "video"
                      : "videos"}
                  </span>
                )}
              </p>
              {currentUser?.data?._id !== profileData?.data?._id && (
                <Button
                  bgColor={`${
                    profileData?.data?.isSubscribed
                      ? "bg-light-2 dark:bg-dark-2"
                      : "bg-transparent"
                  }`}
                  textColor="text-dark-1 dark:text-light-1"
                  className="px-4 flex items-center gap-1 border border-light-2 dark:border-dark-2 rounded-r-full rounded-l-full">
                  {profileData?.data?.isSubscribed ? (
                    <BellAlertIcon className="w-6 h-6" />
                  ) : (
                    <BellIcon className="w-6 h-6" />
                  )}
                  <span className="font-medium">
                    {profileData?.data?.isSubscribed
                      ? "Subscribed"
                      : "Subscribe"}
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
