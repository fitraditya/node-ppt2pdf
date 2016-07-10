# node-ppt2pdf

A nodejs module for converting PowerPoint (also Impress) file into PDF file using unoconv

## Requirement
Unoconv is required, which requires LibreOffice (or OpenOffice)

## Installation
```
  $ [sudo] npm install ppt2pdf
```

## Usage

```javascript
var ppt2pdf = require('ppt2pdf');

var options = {
  output: null                    // specified output name (without extension)
  outputdir: __dirname + 'output'   // outputdir must be absolute path
  pagerange: null                 // specified page range to be converted, example: '1' or '1-2'
}; 

ppt2pdf.convert('test.odp', null, function(error, result) {
  if (error) console.log(error);
  else console.log(result);
});

```

It will return converted file name.

```javascript
{
  result: 'success',
  message: 'test.pdf'
}
```

## Maintainer
[Fitra Aditya][0]

## License
MIT

[0]: https://github.com/fitraditya
