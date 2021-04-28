const fs = require('fs');
const dsv = require('d3-dsv');
const fileName = '4average_clusters_pivoted.csv';

const MONTH_NAMES = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre'
]

const matrix = fs.readFileSync(fileName, 'utf8').split('\n').map(l => l.split(','))

const prepareMonth = month => {
  let str = '' + month;
  if (str.length === 1){
    str = '0' + str;
  }
  return str;
}

const firstRow = matrix[0];
let dates = firstRow.slice(1).reduce((res, item, index) => {
  const year = res.currentYear;
  const monthNumeric = res.currentMonth;
  const monthName = MONTH_NAMES[res.currentMonth];

  return {
    ...res,
    results: [
      ...res.results,
      {
        index,
        monthNumeric,
        monthName,
        year,
        fullName: `${monthName} ${year}`,
        timecode: new Date(year, +monthNumeric, 1).getTime() + 24 * 3600000 // `${year}${prepareMonth(monthNumeric)}`
      }
    ],
    currentMonth: res.currentMonth < 11 ? res.currentMonth + 1 : 0,
    currentYear: res.currentMonth < 11 ? res.currentYear : res.currentYear + 1,
  };
}, {
  currentYear: 2015,
  currentMonth: 0,
  results: []
});
dates = dates.results;
const unpivoted = matrix.slice(1).reduce((res, row) => {
  const topic = row[0];
  for (let i = 1 ; i < row.length ; i++) {
    const month = firstRow[i].trim();
    const value = +row[i].trim();
    res.push({
      topic,
      month,
      value,
      ...dates[i - 1]
    })
  }
  return res;
}, [])

const asStr = dsv.csvFormat(unpivoted);
fs.writeFileSync('4average_clusters_unpivoted.csv', asStr, 'utf8')