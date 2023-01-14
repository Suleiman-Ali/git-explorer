import SearchInput from './searchInput';
import Select from './select';
import { useContext } from 'react';
import Context from '../context';
import { SORT_OPTIONS, ORDER_OPTIONS } from '../lib/constants';

export default function Form() {
  const { submitHandler } = useContext(Context);
  return (
    <form
      className="w-full max-w-5xl flex flex-col gap-2"
      onSubmit={submitHandler}
    >
      <SearchInput />
      <div className="w-full flex gap-1 h-12 sm:gap-2">
        <Select name="sort" options={SORT_OPTIONS} />
        <Select name="order" options={ORDER_OPTIONS} />
        <button
          title="Submit"
          type="submit"
          className="w-full h-full  bg-blue-600 text-white cursor-pointer text-base  sm:text-lg hover:bg-blue-700 active:bg-blue-600 transition-colors font-semibold rounded-sm border-none outline-none"
        >
          Search
        </button>
      </div>
    </form>
  );
}
