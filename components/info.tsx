import Link from 'next/link';

interface InfoPropTypes {
  Icon: any;
  value: string | number;
  text: string;
  bgColor: string;
  textColor: string;
  labelColor: string;
  fillColor: string;
  url?: string;
}

export default function Info({
  Icon,
  value,
  text,
  url,
  textColor,
  bgColor,
  labelColor,
  fillColor,
}: InfoPropTypes) {
  return (
    <div className="w-full bg-white flex items-center gap-3 px-3 py-4 rounded">
      <div className={`${bgColor} p-3 rounded-full `}>
        <div className={`w-5 h-auto ${fillColor}`}>
          <Icon />
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <p className={`font-semibold ${labelColor} text-sm`}>{text}</p>
        {!url && (
          <p className={`font-semibold ${textColor} text-sm`}>{value}</p>
        )}
        {url && (
          <Link href={url} className={`font-semibold ${textColor} text-sm `}>
            {value}
          </Link>
        )}
      </div>
    </div>
  );
}
