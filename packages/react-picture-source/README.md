# @renditions/react-picture-source

[![npm version](https://img.shields.io/npm/v/@renditions/react-picture-source.svg?style=flat-square)](https://www.npmjs.com/package/@renditions/react-picture-source) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

React component for rendering HTML `<source>` tag with nice abstractions over srcset and sizes attributes.

## Install

```sh
npm install @renditions/react-picture-source
```

## Usage

Import `react` and `@renditions/react-picture-source`:

```jsx
import React from 'react'
import Source from '@renditions/react-picture-source'
```

Define a renditions configuration:

```jsx
const renditions = [
  { width: 320 },
  { width: 768 },
  { width: 1280 }
]
```

Define a `getSrc` function that returns the source URL for a given rendition:

```jsx
const getSrc = (filename, ext, rendition) => {
  return `/images/${filename}_${rendition.width}.${ext}`
}
```

Define your `PictureSource` component:

```jsx
const PictureSource = ({ filename, ext, ...rest }) => (
  <Source
    renditions={renditions}
    getSrc={getSrc.bind(null, filename, ext)}
    {...rest}
  >
)
```

Here's what this component renders to the DOM:

JSX:

```html
<PictureSource filename="oranges" ext="webp" type="image/webp">
```

HTML:

```html
<source
  srcset="/images/oranges_320.webp 320w, /images/oranges_768.webp 768w, /images/oranges_1280.webp 1280w"
  type="image/webp"
>
```

### Sizes

By default, the `sizes` attribute is omitted. Not specifying this attribute can lead to the browser loading unnecessarily large images.

Read more about the [sizes attribute here](https://devdocs.io/html/element/source).

To render the `sizes` attribute you can provide `size` and `breakpoints` props. Here's an example using the `size` prop only:

JSX:

```html
<PictureSource filename="oranges" ext="webp" size="50vw" type="image/webp">
```

HTML:

```html
<source
  srcset="/images/oranges_320.webp 320w, /images/oranges_768.webp 768w, /images/oranges_1280.webp 1280w"
  sizes="50vw"
  type="image/webp"
>
```

### Breakpoints

To specify different sizes for different viewport widths, you can provide a `breakpoints` prop.

JSX:

```jsx
<PictureSource
  filename="oranges"
  ext="webp"
  size="100vw"
  breakpoints={[
    {
      mediaMinWidth: '960px',
      size: '100vw'
    },
    {
      mediaMinWidth: '480px',
      size: '50vw'
    }
  ]}
  type="image/webp"
>
```

HTML:

```html
<source
  srcset="/images/oranges_320.webp 320w, /images/oranges_768.webp 768w, /images/oranges_1280.webp 1280w"
  sizes="(min-width: 960px) 100vw, (min-width: 480px) 50vw, 100vw"
  type="image/webp"
>
```

### Sort Order

The `breakpoints` prop is expected to be an array sorted by `mediaMinWidth` in _descending_ order. Likewise, the `renditions` prop is expected to be an array sorted by `width` in _ascending_ order.

To sort these automatically, you can set the `autoSortBreakpoints` and `autoSortRenditions` boolean props.

## See Also

* [@renditions/react-img](https://github.com/stefee/renditions/tree/main/packages/react-img)
* [@renditions/get-sizes](https://github.com/stefee/renditions/tree/main/packages/get-sizes)
* [@renditions/get-srcset](https://github.com/stefee/renditions/tree/main/packages/get-srcset)
