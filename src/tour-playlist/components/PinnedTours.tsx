import { useSelector } from "react-redux";
import { getPinnedTours } from "../tourPlaylistSlice.ts";
import { map } from "lodash";
import { Tour } from "./Tour.tsx";

export default function PinnedTours() {
  const tours = useSelector(getPinnedTours);
  return (
    <div>
      {map(tours, (tour) => (
        <Tour tour={tour} key={tour.time} />
      ))}
    </div>
  );
}
