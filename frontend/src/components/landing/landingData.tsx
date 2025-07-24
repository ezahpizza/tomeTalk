import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { SkeletonOne } from "./SkeletonOne";
import { SkeletonTwo } from "./SkeletonTwo";
import { SkeletonThree } from "./SkeletonThree";
import { SkeletonFour } from "./SkeletonFour";
import { SkeletonFive } from "./SkeletonFive";

export interface LandingItem {
  title: string;
  description: React.ReactNode;
  header: React.ReactNode;
  className: string;
  icon: React.ReactNode;
}

export const landingItems: LandingItem[] = [
  {
    title: "Share Your Reviews",
    description: (
      <span className="text-sm text-slateBlue/80">
        Write detailed reviews and share your thoughts about your favorite books.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-vioBlue" />,
  },
  {
    title: "Discover New Books",
    description: (
      <span className="text-sm text-slateBlue/80">
        Browse through community recommendations and find your next great read.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-charmPink" />,
  },
  {
    title: "Dynamic Discussions",
    description: (
      <span className="text-sm text-slateBlue/80">
        Engage in meaningful conversations about literature with fellow readers.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-vioBlue" />,
  },
  {
    title: "Community Reviews",
    description: (
      <span className="text-sm text-slateBlue/80">
        Read authentic reviews from passionate readers in our growing community.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-charmPink" />,
  },
  {
    title: "Join the Conversation",
    description: (
      <span className="text-sm text-slateBlue/80">
        Connect with book lovers and be part of vibrant literary discussions.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-vioBlue" />,
  },
];
