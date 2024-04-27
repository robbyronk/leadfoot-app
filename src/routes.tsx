import {createBrowserRouter} from "react-router-dom";
import HomePage from "./home/HomePage.tsx";
import TourPlaylistPage from "./tour-playlist/TourPlaylistPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/tour-playlist",
        element: <TourPlaylistPage/>,
    }
]);

export default router;