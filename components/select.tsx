import Context from '../context';
import { useContext } from 'react';
import { isString } from '../lib/helpers';

interface SelectPropTypes {
  name: 'sort' | 'order';
  options: string[];
}

export default function Select({ name, options }: SelectPropTypes) {
  const { searchStateChangeHandler, searchState } = useContext(Context);
  return (
    <select
      className="w-full h-full  bg-white text-base  font-semibold text-blue-500 sm:text-lg  text-center rounded-sm border-none outline-none"
      name={name}
      value={searchState[name]}
      onChange={searchStateChangeHandler}
    >
      {options.map((option) => (
        <option
          key={option}
          value={isString(option) ? option.toLowerCase() : ''}
        >
          {isString(option) ? option : name === 'sort' ? 'Sort By' : 'Order By'}
        </option>
      ))}
    </select>
  );
}
