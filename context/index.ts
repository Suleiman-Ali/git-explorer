import { FormEvent, ChangeEvent, createContext } from 'react';
import { UserSearchType, SearchParamTypes } from '../lib/types';

interface ContextTypes {
  users: UserSearchType[];
  searchState: SearchParamTypes;
  params: SearchParamTypes;
  count: number;
  submitHandler: (e: FormEvent<HTMLFormElement>) => void;
  searchStateChangeHandler: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  searchStateClearHandler: () => void;
}

const Context = createContext<ContextTypes>(undefined!);
export default Context;
