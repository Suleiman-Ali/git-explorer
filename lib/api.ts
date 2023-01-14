import axiosConfig from './axios-config';
import { SearchParamTypes } from './types';

export async function search({ query, sort, order, page }: SearchParamTypes) {
  const url = `search/users?q=${query}&sort=${sort}&order=${order}&per_page=${20}&page=${page}`;
  const response = await axiosConfig.get(url);
  const data = await response.data;
  return data;
}
