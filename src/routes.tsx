import { createBrowserRouter } from "react-router-dom";
import HomePage from "./home/HomePage.tsx";
import TourPlaylistPage from "./tour-playlist/TourPlaylistPage.tsx";
import SuspensionCalculatorPage from "./suspension-calculator/SuspensionCalculatorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/tour-playlist",
    element: <TourPlaylistPage />,
  },
  {
    path: "/suspension-calculator",
    element: <SuspensionCalculatorPage />,
  },
]);

export default router;
