export function parseDate(jsonDate: object) {
  if (jsonDate === undefined || jsonDate === null)
    return undefined;
  if (jsonDate.hasOwnProperty('time') && jsonDate.hasOwnProperty('date'))
    return new Date(
      jsonDate['date']['year'], jsonDate['date']['month'] - 1, jsonDate['date']['day'],
      jsonDate['time']['hour'], jsonDate['time']['minute'], jsonDate['time']['second']
    );
  else
    return new Date(jsonDate['year'], jsonDate['month'] - 1, jsonDate['day']);
}
