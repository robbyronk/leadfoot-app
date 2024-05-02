import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <h1 className={"text-3xl font-bold underline italic"}>Leadfoot</h1>
      <p>
        Welcome to Leadfoot! This is a collection of tools and resources for
        Forza Horizon 5 players.
      </p>
      <ul>
        <li>
          <Link to="/tour-playlist">FH5 Tour Playlist</Link>
        </li>
        <li>
          <Link to="/suspension-calculator">Suspension Calculator</Link>
        </li>
      </ul>
    </>
  );
}
