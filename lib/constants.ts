import { SearchParamTypes } from './types';

export const DEFAULT_PARAMS: SearchParamTypes = {
  query: '',
  sort: '',
  order: '',
  page: '1',
};
export const SORT_OPTIONS = ['', 'Followers', 'Repositories', 'Joined'];
export const ORDER_OPTIONS = ['', 'Asc', 'Desc'];
