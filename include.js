/**
 * @author    Dai-Hyun Kim
 * @version   0.0.1
 * @since 2015-02-03
 */
var path = require('path'),
    fs = require('fs');

var uioPath = path.join(__dirname, 'src/images'),
    files = fs.readdirSync(uioPath),
    oJson = {};

console.log('CURRENT PATH : ' + __dirname);
console.log('UIO FILES : ' + files);

/* 파일에서 정보 가져오기 */
files.forEach(function(item, index){
    var sName = item.split('_')[0];

    oJson[index].push(item);
});

fs.writeFile(path.join(__dirname, 'src/files.json'), JSON.stringify(oJson));

