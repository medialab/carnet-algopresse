const fs = require('fs');
const dsv = require('d3-dsv');
const fileName = 'Timeline critic notcritic full.csv';

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

const matrix = fs.readFileSync(fileName, 'utf8').split('\n').map(l => l.split(';').map(s => s.replace(/"/g, '')))

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
  let type = row[0];
  if (type === 'True') {
    type = 'critic';
  } else if (type === 'False') {
    type = 'not critic';
  }
  for (let i = 1 ; i < row.length ; i++) {
    const month = firstRow[i].trim();
    const value = +row[i].replace(',', '.').trim();
    res.push({
      type,
      month,
      value,
      ...dates[i - 1]
    })
  }
  return res;
}, [])

const asStr = dsv.csvFormat(unpivoted);
fs.writeFileSync('critic_notcritic_unpivoted.csv', asStr, 'utf8')