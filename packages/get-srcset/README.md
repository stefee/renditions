# @renditions/get-srcset

[![npm version](https://img.shields.io/npm/v/@renditions/get-srcset.svg?style=flat-square)](https://www.npmjs.com/package/@renditions/get-srcset) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

Generate the srcset attribute for HTML [img](https://devdocs.io/html/element/img) and [picture](https://devdocs.io/html/element/source) tags.

## Install

```sh
npm install @renditions/get-srcset
```

## Usage

```js
import getSrcset from '@renditions/get-srcset'

const srcset = getSrcset([
  {
    src: '/images/320.jpg',
    width: 320
  },
  {
    src: '/images/1024.jpg',
    width: 1024
  }
])

console.log({ srcset })
// { srcset: '/images/320.jpg 320w,/images/1024.jpg 1024w' }
```

### Sorting

The first argument is expected to be an array sorted by `width` in ascending order.

To sort the array automatically, pass `true` for the second argument:

```js
const unsortedRenditions = [
  {
    src: '/images/1024.jpg',
    width: 1024
  },
  {
    src: '/images/320.jpg',
    width: 320
  },
  {
    src: '/images/720.jpg',
    width: 720
  }
]

const srcset = getSrcset(unsortedRenditions, true)

console.log({ srcset })
// { srcset: '/images/320.jpg 320w,/images/720.jpg 720w,/images/1024.jpg 1024w' }
```

### Using with React

```jsx
import React from 'react'
import getSrcset from '@renditions/get-srcset'

const renditionWidths = ['320', '1024']

const Image = ({ filename, ext, ...rest }) => {
  const renditions = renditionWidths.map(width => ({
    width,
    src: `/images/${filename}_${width}.${ext}`
  }))

  const srcset = getSrcset(renditions)

  return <img srcSet={srcset} {...rest} />
}
```
