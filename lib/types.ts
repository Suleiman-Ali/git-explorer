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
  html_url: string;
};

export type UserType = {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  location: string;
  bio: string;
  company: string;
  blog: string;
  email: string;
  twitter_username: string;
  html_url: string;
  hireable: boolean;
  followers: number;
  following: number;
  public_gists: number;
  public_repos: number;
};

export type RepoType = {
  id: number;
  name: string;
  description: string;
  language: string;
  html_url: string;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  // languages_url: 'https://api.github.com/repos/bradtraversy/50projects50days/languages';
};
