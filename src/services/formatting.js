export function pluralize(number, word) {
  return `${number} ${word}${number === 1 ? "" : "s"}`;
}

export function timeDifferenceInMinutes(latterEventTimestamp, formerEventTimestamp) {
  if (!latterEventTimestamp && formerEventTimestamp) {
    return Number.POSITIVE_INFINITY;
  }

  if (latterEventTimestamp && !formerEventTimestamp) {
    return Number.NEGATIVE_INFINITY;
  }

  return Math.ceil((latterEventTimestamp - formerEventTimestamp) / 1000 / 60);
}

export function prettyFormatMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes - hours * 60;

  return (hours ? `${hours} h ` : "") + (minutes ? `${minutes} min` : "");
}
