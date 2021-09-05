export type Rendition = {
  src: string;
  width: number;
};

export const sortRenditions = <T extends { width: number }>(
  renditions: T[]
): T[] => {
  renditions.forEach((r) => {
    if (typeof r.width === "string") {
      r.width = parseInt(r.width, 10);
    }
  });

  renditions.sort((a, b) => a.width - b.width);

  return renditions;
};

const getSrcset = (renditions: Rendition[]) =>
  renditions.map(({ src, width }) => `${src} ${width}w`).join(",");

const getSortedSrcset = (renditions: Rendition[], sort = false): string => {
  if (!sort) {
    return getSrcset(renditions);
  }

  const renditionsCopy = [...renditions];

  const sortedRenditions = sortRenditions(renditionsCopy);

  return getSrcset(sortedRenditions);
};

export default getSortedSrcset;
