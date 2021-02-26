const fs = require('fs');
const dsv = require('d3-dsv');

const nerFile = 'public/DATE NER TFIDF V3.xlsx - Feuil1.csv';
const freqFilePath = 'public/date-301-360.csv';

const nerData = dsv.csvParse(fs.readFileSync(nerFile, 'utf8'))
const freqData = dsv.tsvParse(fs.readFileSync(freqFilePath, 'utf8'))


const nerMap = nerData.reduce((res, datum) => ({...res, [datum.entity.toLowerCase()]: datum}), {})
const freqMap = freqData.reduce((res, datum) => ({...res, [datum.entity.toLowerCase()]: datum}), {})

Object.entries(nerMap)
.forEach(([key, val]) => {
  if (freqMap[key]) {
    nerMap[key].frequency = freqMap[key].frequency;
  }
})

fs.writeFileSync('public/dates-with-freq.csv', dsv.csvFormat(
  Object.entries(nerMap).map(([_id, datum]) => datum)

), 'utf8')