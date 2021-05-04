/**
 * Bucket publications by years.
 */
export const groupByYear = (items) => {
  // group into year
  const dict = items.reduce((res, item) => {
    const content = item.childPublicationsJson;
    const year = content.year;
    if (!res[year]) {
      res[year] = [];
    }
    res[year].push(content);
    return res;
  }, {});

  // sort
  const keys = Object.keys(dict)
    .sort((a, b) => Number(b.year) - Number(a.year))
    .reverse();

  // dict -> list
  const list = keys.map((key) => {
    return { year: key, data: dict[key] };
  });

  return list;
};
