# @renditions/get-sizes

[![npm version](https://img.shields.io/npm/v/@renditions/get-sizes.svg?style=flat-square)](https://www.npmjs.com/package/@renditions/get-sizes) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

Generate the sizes attribute for HTML [img](https://devdocs.io/html/element/img) and [picture](https://devdocs.io/html/element/source) tags.

## Install

```sh
npm install @renditions/get-sizes
```

## Usage

```js
import getSizes from '@renditions/get-sizes'

const sizes = getSizes({
  size: '100vw',
  breakpoints: [
    {
      mediaMinWidth: '960px',
      size: '50vw'
    },
    {
      mediaMinWidth: '480px'
    }
  ]
})

console.log({ sizes })
// { sizes: '(min-width: 960px) 50vw,(min-width: 480px) 100vw,100vw' }
```

### Breakpoints

The breapoints argument is expected to be an array sorted by `mediaMinWidth` in descending order.

To sort the breakpoints automatically, pass `true` for the second argument:

```js
const sizesConfig = {
  size: '100vw',
  breakpoints: [
    {
      mediaMinWidth: '960px',
      size: '50vw'
    },
    {
      mediaMinWidth: '1440px',
      size: '33vw'
    },
    {
      mediaMinWidth: '480px'
    }
  ]
}

const sizes = getSizes(sizesConfig, true)

console.log({ sizes })
// { sizes: '(min-width: 1440px) 33vw,(min-width: 960px) 50vw,(min-width: 480px) 100vw,100vw' }
```

The breakpoints array can be also be omitted entirely:

```js
console.log({ sizes: getSizes({ size: '100vw' }) })
// { sizes: '100vw' }
```

### Using with React

```jsx
import React from 'react'
import getSizes from '@renditions/get-sizes'

const MyImage = ({ size = '100vw', ...rest }) => {
  const sizes = getSizes({ size })

  return <img sizes={sizes} {...rest} />
}
```
