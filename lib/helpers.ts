export function isEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

export function isString(str: string) {
  if (!str) return false;
  return str.length > 0;
}

export function constructUrl(
  query: string,
  sort: string,
  order: string,
  page: string | number
) {
  const queryP = isString(query) ? `?query=${query}` : '';
  const sortP = isString(sort) ? `&sort=${sort}` : '';
  const orderP = isString(order) ? `&order=${order}` : '';
  const url = `/${queryP}${sortP}${orderP}&page=${page}`;
  return isString(query) ? url : '';
}

export function paginate(count: number) {
  const n_pages = Math.ceil(count / 20);
  const display_n_pages = n_pages <= 10 ? n_pages : 10;
  const pages = [];
  for (let i = 0; i < display_n_pages; i++) pages.push(i + 1);
  return pages;
}

export function getCount(n: number) {
  let num = Math.round(n);
  if (num > 999999) return `${(num / 1000000).toString().split('.')[0]}M`;
  if (num > 999) return `${(num / 1000).toString().split('.')[0]}K`;
  return `${num}`;
}
