import { getFilteredTours } from "../tourPlaylistSlice.ts";
import { useSelector } from "react-redux";
import { Tour } from "./Tour.tsx";
import { map } from "lodash";

export default function Tours() {
  const tours = useSelector(getFilteredTours);
  return (
    <div>
      {map(tours, (tour) => (
        <Tour tour={tour} key={tour.time} />
      ))}
    </div>
  );
}
