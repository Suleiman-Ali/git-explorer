import Context from '../context';
import Image from 'next/image';
import { useContext } from 'react';
import { isString } from '../lib/helpers';

export default function SearchInput() {
  const { searchState, searchStateChangeHandler, searchStateClearHandler } =
    useContext(Context);
  const { query, sort, order } = searchState;
  const isShowClear = isString(query) || isString(sort) || isString(order);
  return (
    <div className="h-16 w-full relative">
      <Image
        width={17.5}
        height={17.5}
        src="/icons/search.svg"
        alt="search"
        className="absolute top-[50%] left-3 translate-y-[-50%] w-4 h-auto "
      />
      <input
        type="text"
        placeholder="Search by name or email"
        className="outline-none border-2 border-white w-full  h-full px-10 text-base sm:text-lg text-blue-600 font-semibold rounded-sm  focus-within:border-blue-500 transition-colors placeholder:text-blue-500"
        name="query"
        value={query}
        onChange={searchStateChangeHandler}
        autoComplete="off"
      />
      {isShowClear && (
        <button
          type="button"
          title="Clear"
          onClick={searchStateClearHandler}
          className="outline-none border-none w-5 h-5 absolute top-[50%] right-3 translate-y-[-50%] sm:w-6 sm:h-6 bg-blue-500  rounded-full flex items-center justify-center hover:bg-blue-600 active:bg-blue-500 transition-colors"
        >
          <Image
            width={11}
            height={11}
            src="/icons/x.svg"
            alt="search"
            className="w-[8px] h-auto sm:w-[10px]"
          />
        </button>
      )}
    </div>
  );
}
