import axiosConfig from './axios-config';
import { SearchParamTypes } from './types';

export async function search({ query, sort, order, page }: SearchParamTypes) {
  const url = `search/users?q=${query}&sort=${sort}&order=${order}&per_page=${20}&page=${page}`;
  const response = await axiosConfig.get(url);
  const data = await response.data;
  return data;
}

export async function getUser(username: string) {
  const url = `users/${username}?languages=true`;
  const response = await axiosConfig.get(url);
  const data = await response.data;
  return data;
}

export async function getFollowers(username: string) {
  const url = `users/${username}/followers`;
  const response = await axiosConfig.get(url);
  const data = await response.data;
  return data;
}

export async function getFollowing(username: string) {
  const url = `users/${username}/following`;
  const response = await axiosConfig.get(url);
  const data = await response.data;
  return data;
}

export async function getRepos(username: string) {
  const url = `users/${username}/repos`;
  const response = await axiosConfig.get(url);
  const data = await response.data;
  return data;
}
