#! /bin/bash
npm exec --no tsc
npm exec --no esbuild -- Source.tsx --platform=neutral --format=cjs --outfile=Source.dist.js
npm exec --no esbuild -- Source.tsx --platform=browser --format=cjs --target=es2017 --minify --outfile=Source.dist.min.js
