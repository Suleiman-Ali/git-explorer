export type SearchParamTypes = {
  query: string;
  sort: 'followers' | 'repositories' | 'joined' | '';
  order: 'asc' | 'desc' | '';
  page: string | number;
};

export type UserSearchType = {
  id: number;
  login: string;
  avatar_url: string;
};
