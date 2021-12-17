import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import { getPlantsList } from "./../services/plants-service";
import type { Plant } from "./../services/plants-service";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  // return getPlantsList();

  return [
    {
      desiName: "तामण",
      videsiName: "Lagerstromia speciosa",
      slug: "lagerstromia-speciosa",
    },
    {
      desiName: "काटेसावर",
      videsiName: "Bombax ceiba",
      slug: "bombax-ceiba",
    },
    {
      desiName: "सोनसावर/गणेर",
      videsiName: "Cochlospermum religosum",
      slug: "cochlospermum-religosum",
    },
    {
      desiName: "पळस",
      videsiName: "Butea monosperma",
      slug: "butea-monosperma",
    },
  ];
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Sahyadri Seed Collection",
    description: "Visual representation of the preferred plants",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let plants = useLoaderData<Plant[]>();

  return (
    <div className="remix__page">
      <main>
        <h2>Hi Nature Lovers 👋</h2>
        <p>
          There is an effort going on to collect seeds of the native tree and
          plant species in Sahyadri mountain range in India. 🏔️🏔️🏔️
        </p>
        <p>
          These species are well known for their best flowering / fruiting
          qualities and hence serve as the food plazas and juice centres for
          birds, honeybees, butterflies, beetles and bugs! 🐦 🐝 🐛 🐞 🦋
        </p>
        <p>
          Identifying such species is the first hurdle for a novice like me.
          This website attempts to give visual 🤓 information about these
          species so that, it could be used as a reference in the wild. 🌻 🌱 🍀
        </p>
        <p>Hope it helps!</p>

        <h2>Plants of interest</h2>
        <ul className="plant-list">
          {plants.map((plant) => (
            <li key={plant.slug}>
              <Link to={`/trees/${plant.slug}`}>
                {plant.desiName} : {plant.videsiName}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
