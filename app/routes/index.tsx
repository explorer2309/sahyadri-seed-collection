import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

type IndexData = {
  plants: Array<{ desiName: string; videshiName: string; url: string }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  let data: IndexData = {
    plants: [
      {
        desiName: "तामण",
        videshiName: "Lagerstromia speciosa",
        url: "https://remix.run/docs",
      },
      {
        desiName: "काटेसावर",
        videshiName: "Bombax ceiba",
        url: "https://reactrouter.com/docs",
      },
      {
        desiName: "सोनसावर/गणेर",
        videshiName: "Cochlospermum religosum",
        url: "https://discord.gg/VBePs6d",
      },
    ],
  };

  // https://remix.run/api/remix#json
  return json(data);
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
  let data = useLoaderData<IndexData>();

  return (
    <div className="remix__page">
      <main>
        <h2>Hi Nature Lovers 👋</h2>
        <p>
          There is an effort going on to collect seeds of the native tree and
          plant species in Sahyadri mountain range in India. ⛰️⛰️⛰️
        </p>
        <p>
          These species are well known for their best flowering / fruiting
          qualities and hence serve as the food plazas and juice centres for
          Birds, honeybees butterflies, beetles and bugs! 🐦 🐝 🐛 🐞 🦋
        </p>
        <p>
          Identifying such species is the first hurdle for a novice like me.
          This website attempts to give visual 🤓 information about these
          species so that, it could be used as a reference in the wild. 🌻 🌱 🍀
        </p>
        <p>Hope it helps!</p>

        <h2>Plants of interest</h2>
        <ul className="plant-list">
          {data.plants.map((resource) => (
            <li key={resource.url} className="remix__page__resource">
              <a href={resource.url}>
                {resource.desiName} - {resource.videshiName}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
