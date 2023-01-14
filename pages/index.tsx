import Context from '../context';
import Title from '../components/title';
import Form from '../components/form';
import Pages from '../components/pages';
import Message from '../components/message';
import Users from '../components/users';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { search } from '../lib/api';
import { constructUrl, isEmpty } from '../lib/helpers';
import { SearchParamTypes, UserSearchType } from '../lib/types';
import { useRouter } from 'next/router';
import { DEFAULT_PARAMS } from '../lib/constants';

interface getServerSidePropsTypes {
  query: SearchParamTypes;
}

// prettier-ignore
export async function getServerSideProps(context: getServerSidePropsTypes) {
  const isSearch = !isEmpty(context.query);
  const params = isSearch ? context.query : DEFAULT_PARAMS;
  const props = { params, users: [], count: 0, isSearch, isResult: false, isError: false };
  try {
    if (params.page > 10 || params.page < 1) throw new Error();
    const { items, total_count } = await search(params);
    props.isResult = items.length > 0;
    props.users = items;
    props.count = total_count;
  } catch (e) {
    props.isError = true;
  }
  return { props };
}

interface HomePropTypes {
  params: SearchParamTypes;
  users: UserSearchType[];
  count: number;
  isSearch: boolean;
  isError: boolean;
  isResult: boolean;
}

export default function Home({
  params,
  users,
  count,
  isSearch,
  isResult,
  isError,
}: HomePropTypes) {
  const router = useRouter();
  const [searchState, setSearchState] = useState<SearchParamTypes>(params);
  const { query, sort, order, page } = searchState;

  useEffect(() => {
    setSearchState(params);
  }, [params]);

  const searchStateClearHandler = () => {
    setSearchState((state) => ({ ...state, query: '', sort: '', order: '' }));
  };

  const searchStateChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchState({ ...searchState, [name]: value });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = constructUrl(query, sort, order, page);
    router.push(url);
  };

  return (
    <Context.Provider
      value={{
        users,
        searchState,
        searchStateChangeHandler,
        searchStateClearHandler,
        submitHandler,
        count,
        params,
      }}
    >
      <div className="flex flex-col gap-10 items-center justify-center py-24 px-2 ">
        <Title />
        <Form />
        <Pages />
        {isSearch && (
          <>
            {isResult && <Users />}
            {isError && <Message message="Error Occurred" />}
            {!isResult && !isError && <Message message="No Users Found" />}
          </>
        )}
      </div>
    </Context.Provider>
  );
}
