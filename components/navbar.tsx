import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white py-5 flex items-center justify-center">
      <Link href="/">
        <Image
          width={300}
          height={300}
          src="/images/logo.svg"
          alt="logo"
          className="w-full max-w-[275px] h-auto"
        />
      </Link>
    </nav>
  );
}
