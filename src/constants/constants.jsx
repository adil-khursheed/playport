import {
  HomeIcon,
  HandThumbUpIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeFill,
  HandThumbUpIcon as ThumbUpFill,
  VideoCameraIcon as VideoCameraFill,
} from "@heroicons/react/24/solid";

export const navLinks = [
  {
    label: "Home",
    iconOutline: <HomeIcon />,
    iconFill: <HomeFill />,
    route: "/",
  },
  {
    label: "Liked Videos",
    iconOutline: <HandThumbUpIcon />,
    iconFill: <ThumbUpFill />,
    route: "/liked-videos",
  },
  {
    label: "History",
    iconOutline: "/icons/history.svg",
    iconFill: "/icons/history-fill.svg",
    route: "/history",
  },
  {
    label: "My Content",
    iconOutline: <VideoCameraIcon />,
    iconFill: <VideoCameraFill />,
    route: "/my-content",
  },
];
