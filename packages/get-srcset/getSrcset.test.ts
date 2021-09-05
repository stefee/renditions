import getSrcset, { Rendition } from "./getSrcset";

describe("get srcset attribute", () => {
  let renditions: Rendition[];

  beforeEach(() => {
    renditions = [
      {
        src: "/images/320.jpg",
        width: 320,
      },
      {
        src: "/images/720.jpg",
        width: 720,
      },
      {
        src: "/images/1024.jpg",
        width: 1024,
      },
    ];
  });

  it("should return a string", () => {
    expect(typeof getSrcset(renditions)).toBe("string");
  });

  it("should return srcset", () => {
    expect(getSrcset(renditions)).toBe(
      "/images/320.jpg 320w,/images/720.jpg 720w,/images/1024.jpg 1024w"
    );
  });

  it("should not sort renditions if sort param is false", () => {
    const result = getSrcset(renditions, false);
    expect(result).toBe(
      "/images/320.jpg 320w,/images/720.jpg 720w,/images/1024.jpg 1024w"
    );
  });

  it("should sort renditions by widths in ascending order if sort param is true", () => {
    renditions.reverse();
    const result = getSrcset(renditions, true);
    expect(result).toBe(
      "/images/320.jpg 320w,/images/720.jpg 720w,/images/1024.jpg 1024w"
    );
  });

  it("should not modify the renditions array", () => {
    renditions.reverse();
    const originalRenditions = [...renditions];
    getSrcset(renditions, true);
    expect(renditions).toEqual(originalRenditions);
  });
});
