export type Breakpoint = {
  mediaMinWidth: string;
  size?: string;
};

const sortByMediaMinWidth = (breakpoints: Breakpoint[]) => {
  const sortableBreakpoints: (Breakpoint & { _mediaMinWidthInt: number })[] =
    breakpoints.map((bp) => ({
      ...bp,
      _mediaMinWidthInt: parseInt(bp.mediaMinWidth, 10),
    }));
  sortableBreakpoints.sort((a, b) => b._mediaMinWidthInt - a._mediaMinWidthInt);
  return sortableBreakpoints;
};

const getSizes = (
  {
    size,
    breakpoints = [],
  }: {
    size: string;
    breakpoints?: Breakpoint[];
  },
  sort = false
): string => {
  const sorted = sort ? sortByMediaMinWidth(breakpoints) : breakpoints;
  const sizes = sorted.map(
    (bp) => `(min-width: ${bp.mediaMinWidth}) ${bp.size || size}`
  );
  sizes.push(size);
  return sizes.join(",");
};

export default getSizes;
