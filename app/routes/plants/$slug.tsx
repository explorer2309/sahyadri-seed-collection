import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getPlant } from "./../../services/plants-service";
import type { Plant } from "./../../services/plants-service";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPlant(params.slug);
};

export default function PostSlug() {
  const plant = useLoaderData();
  return (
    <div>
      <h1>
        {plant.desiName} - {plant.videsiName}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: plant.html }} />
    </div>
  );
}
