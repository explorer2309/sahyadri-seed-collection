import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";

export type Plant = {
  slug: string;
  desiName: string;
  videsiName: string;
};

export type PlantMarkdownAttributes = {
  desiName: string;
  videsiName: string;
};

const plantsPath = path.join(__dirname, "./../../", "plants");

function isValidPostAttributes(
  attributes: any
): attributes is PlantMarkdownAttributes {
  return attributes?.desiName && attributes?.videsiName;
}

export async function getPlantsList() {
  const dir = await fs.readdir(plantsPath);
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(plantsPath, filename));
      const { attributes } = parseFrontMatter(file.toString());
      invariant(
        isValidPostAttributes(attributes),
        `${filename} has bad meta data!`
      );
      return {
        slug: filename.replace(/\.md$/, ""),
        desiName: attributes.desiName,
        videsiName: attributes.videsiName,
      };
    })
  );
}

export async function getPlant(slug: string) {
  const filepath = path.join(plantsPath, slug + ".md");
  const file = await fs.readFile(filepath);
  const { attributes, body } = parseFrontMatter(
    file.toString()
  );
  invariant(
    isValidPostAttributes(attributes),
    `Plant ${filepath} is missing attributes`
  );
  const html = marked(body);
  return { slug, html, desiName: attributes.desiName, videsiName: attributes.videsiName };
}