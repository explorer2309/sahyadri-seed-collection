import { useTransition, useActionData, Form, redirect } from "remix";
import type { ActionFunction } from "remix";
import invariant from "tiny-invariant";

import { createPlant } from "../../services/plants-service";

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));
  const formData = await request.formData();
  const desiName = formData.get("desiName");
  const videsiName = formData.get("videsiName");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: Record<string, boolean> = {};
  if (!desiName) errors.title = true;
  if (!videsiName) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof desiName === "string");
  invariant(typeof videsiName === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");
  await createPlant({ desiName, videsiName, slug, markdown });

  return redirect("/admin");
};

export default function NewPost() {
  const errors = useActionData();
  const transition = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Desi Title: {errors?.desiName && <em>Desi Title is required</em>}
          <input type="text" name="desiName" />
        </label>
      </p>
      <p>
        <label>
          Videsi Title:{" "}
          {errors?.videsiName && <em>Videsi Title is required</em>}
          <input type="text" name="videsiName" />
        </label>
      </p>
      <p>
        <label>
          Post Slug: {errors?.slug && <em>Slug is required</em>}
          <input type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        {errors?.markdown && <em>Markdown is required</em>}
        <br />
        <textarea rows={20} name="markdown" />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Creating..." : "Create Post"}
        </button>
      </p>
    </Form>
  );
}
