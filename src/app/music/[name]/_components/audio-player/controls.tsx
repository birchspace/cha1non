import { Shuffle, Rewind, PlayCircle, Pause } from "lucide-react";
import { FastForward, RefreshCw, MinusCircle } from "lucide-react";
import { useAtom } from "jotai";

type ControlsProps = {
  onPlayClick: () => void;
  onPrevClick: () => void;
  onNextClick: () => void;
  onRepeatClick: () => void;
  onShuffleClick: () => void;
  isPlaying: boolean;
  repeat: boolean;
  shuffle: boolean;
};

const Controls = ({
  onPlayClick,
  isPlaying,
  onPrevClick,
  onNextClick,
  repeat,
  onRepeatClick,
  shuffle,
  onShuffleClick,
}: ControlsProps) => {
  const handle = () => {
    onPlayClick();
  };
  return (
    <div className="flex w-full flex-row justify-center px-4">
      {/* 随机播放 */}
      <button className="btn btn-ghost btn-sm" onClick={onShuffleClick}>
        {shuffle ? (
          <Shuffle size={20} color="#383838" />
        ) : (
          <Shuffle size={20} color="#383838" />
        )}
      </button>
      {/* 上一首 */}
      <button className="btn btn-ghost btn-sm" onClick={onPrevClick}>
        <Rewind color="#383838" size={20} />
      </button>
      {/* 播放/暂停 */}
      <button className="btn btn-ghost btn-sm" onClick={handle}>
        {isPlaying ? (
          <Pause color="#383838" strokeWidth={1.5} />
        ) : (
          <PlayCircle color="#383838" strokeWidth={1.5} />
        )}
      </button>
      {/* 下一首 */}
      <button className="btn btn-ghost btn-sm" onClick={onNextClick}>
        <FastForward color="#383838" strokeWidth={1.5} />
      </button>

      {/* 循环 */}
      {/* <button className="btn btn-ghost btn-sm" onClick={onRepeatClick}>
        {repeat ? (
          <RefreshCw color="#383838" strokeWidth={1.5} />
        ) : (
          <MinusCircle color="#383838" strokeWidth={1.5} />
        )}
      </button> */}
    </div>
  );
};

export default Controls;

type ImageButtonProps = {
  src: string;
  onClick: () => void;
  className?: string;
};

const ImageButton = ({ onClick, src, className }: ImageButtonProps) => {
  const buttonSize = 65;
  return (
    <button onClick={onClick}>
      <img
        src={src}
        width={buttonSize}
        height={buttonSize}
        className={`drop-shadow-lg ${className ?? ""}`}
      />
    </button>
  );
};
