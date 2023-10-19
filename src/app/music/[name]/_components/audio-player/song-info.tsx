import Image from "next/image";

type SongInfoProps = {
  title?: string;
  artist?: string;
  coverArtSrc: string;
};

const SongInfo = ({ title, artist, coverArtSrc }: SongInfoProps) => {
  return (
    <div className="flex w-full items-center justify-around">

      <div className="flex w-1/3 flex-col justify-start gap-4">
        <span className="text-2xl text-primary drop-shadow-lg">{title}</span>
        <span className="text-base text-primary drop-shadow-lg">{artist}</span>
      </div>
    </div>
  );
};

export default SongInfo;
