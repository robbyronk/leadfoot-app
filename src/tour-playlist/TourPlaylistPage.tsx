import { ClassPicker } from "./components/ClassPicker.tsx";
import { RacePicker } from "./components/RacePicker.tsx";
import Time from "./components/Time.tsx";
import Tours from "./components/Tours.tsx";
import PinnedTours from "./components/PinnedTours.tsx";

export default function TourPlaylistPage() {
  return (
    <div className="App">
      <Time />
      <a href="https://www.reddit.com/r/ForzaHorizon/comments/uf9l7o/list_of_all_720_horizon_tours_in_the_new_24_hour/">
        Special thanks to u/aqx for documenting the tour playlist
      </a>
      <ClassPicker />
      <RacePicker />
      <PinnedTours />
      <Tours />
    </div>
  );
}
