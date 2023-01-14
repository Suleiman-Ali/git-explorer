import Context from '../context';
import Link from 'next/link';
import { useContext } from 'react';
import { paginate } from '../lib/helpers';

export default function Pages() {
  const { count, params } = useContext(Context);
  const { page: currentPage } = params;
  const pages = paginate(count);
  const isMany = pages.length > 1;
  return isMany ? (
    <div className="w-full max-w-5xl grid grid-cols-[repeat(auto-fit,minmax(27.5px,32px))] gap-2 items-center justify-center">
      {pages.map((page) => (
        <Link
          href={{ query: { ...params, page } }}
          key={page}
          className={`w-7 h-7 sm:w-8 sm:h-8  rounded-full  p-2 flex items-center justify-center font-semibold bg-blue-600 text-white cursor-pointer text-base   hover:bg-blue-700 active:bg-blue-600 transition-all border-none outline-none 
        ${+currentPage === page ? 'bg-blue-800' : ''}
        `}
        >
          {page}
        </Link>
      ))}
    </div>
  ) : null;
}
