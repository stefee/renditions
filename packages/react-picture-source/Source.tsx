import * as React from "react";
import getSizes, { Breakpoint } from "@renditions/get-sizes";
import getSrcset, { sortRenditions } from "@renditions/get-srcset";

export type { Breakpoint } from "@renditions/get-sizes";
export type { Rendition } from "@renditions/get-srcset";

export type RenditionConfig = {
  width: number;
};

const Source: React.FC<
  {
    getSrc: (rendition: RenditionConfig) => string;
    renditions: RenditionConfig[];
    size: string;
    breakpoints?: Breakpoint[];
    autoSortRenditions?: boolean;
    autoSortBreakpoints?: boolean;
  } & React.SourceHTMLAttributes<HTMLSourceElement>
> = ({
  getSrc,
  renditions: renditionConfigs,
  size,
  breakpoints = [],
  autoSortRenditions = false,
  autoSortBreakpoints = false,
  ...rest
}) => {
  const renditions = renditionConfigs.map((rendition) => ({
    ...rendition,
    src: getSrc(rendition),
  }));

  if (autoSortRenditions) {
    sortRenditions(renditions);
  }

  return (
    <source
      srcSet={getSrcset(renditions)}
      sizes={size && getSizes({ size, breakpoints }, autoSortBreakpoints)}
      {...rest}
    />
  );
};

export default Source;
