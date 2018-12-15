const fs = require('fs'),
  request = require('request'),
  data = require('./data'),
  fp = require('lodash/fp')
var download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    if (err) {
      console.error(err)
      return
    }
    request(uri)
      .pipe(fs.createWriteStream(`images/${filename}`))
      .on('error', () => {
        console.log('Cannot download image', uri)
      })
      .on('close', callback)
  })
}

const images = data
  .hehe()
  .split('\n')
  .filter(url => !!url && url !== '/')

images.forEach(url => {
  console.log('url', url)

  const fileName = fp.compose(
    fp.last,
    fp.split('/')
  )(url)
  console.log('fileName:', fileName)
  download(url, fileName, function() {
    // console.log('done')
  })
})