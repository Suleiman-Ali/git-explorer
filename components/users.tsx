import Context from '../context';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';

export default function Users() {
  const { users } = useContext(Context);
  return (
    <div className="w-full max-w-5xl grid grid-cols-[repeat(auto-fill,minmax(175px,1fr))] gap-x-3 gap-y-8">
      {users.map(({ id, login, avatar_url }) => (
        <Link
          href={`/user/${id}/${login}`}
          key={id}
          className="w-full min-h-[85px] flex flex-col items-center justify-end  cursor-pointer bg-white  p-3 rounded relative group hover:bg-blue-100 transition-colors active:bg-white border border-blue-500"
        >
          <Image
            width={62.5}
            height={62.5}
            alt={`${id}`}
            src={avatar_url}
            className="w-full max-w-[60px] h-auto rounded-full  absolute -top-[30%] left-[50%] translate-x-[-50%]   transition-all  border border-blue-500"
          />
          <p className="font-semibold text-blue-600">{login.slice(0, 20)}</p>
        </Link>
      ))}
    </div>
  );
}
