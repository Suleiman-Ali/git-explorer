interface MessagePropTypes {
  message: string;
}

export default function Message({ message }: MessagePropTypes) {
  return (
    <p className="text-lg text-blue-600 font-semibold sm:text-xl">{message}</p>
  );
}
