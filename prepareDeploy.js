const fs = require('fs');
const {homepage} = require('./package.json');

let indexContents = fs.readFileSync('./build/index.html', 'utf8');

indexContents = indexContents.replace(/<script src="/g, `<script src="${homepage}`);
indexContents = indexContents.replace(/<link jhref="/g, `<link jhref="${homepage}`);
indexContents = indexContents.replace(/<link rel="(.*)" href="/g, ($1) => `<link rel="${$1}" href="${homepage}`);

fs.writeFileSync('./build/index.html', indexContents, 'utf8');