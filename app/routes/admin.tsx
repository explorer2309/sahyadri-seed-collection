import { Outlet, Link, useLoaderData } from "remix";

import { getPlantsList } from "../services/plants-service";
import type { Plant } from "../services/plants-service";
import adminStyles from "~/styles/admin.css";

export const links = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader = () => {
  return getPlantsList();
};

export default function Admin() {
  const plants = useLoaderData<Plant[]>();
  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <ul>
          {plants.map((post) => (
            <li key={post.slug}>
              <Link to={`/plants/${post.slug}`}>{post.desiName}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
