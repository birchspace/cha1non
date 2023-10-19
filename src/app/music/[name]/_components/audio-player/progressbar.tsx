"use client";

type ProgressBarProps = {
  progress: number;
  onChange: (value: number) => void;
  leftLabel?: string;
  rightLabel?: string;
};

const ProgressBar = ({
  progress,
  onChange,
  leftLabel,
  rightLabel,
}: ProgressBarProps) => {
  return (
    <div className="flex h-full flex-col justify-end gap-6">
      <div className="flex flex-col">
        <input
          type="range"
          min={0}
          max="100"
          value={progress}
          onChange={(event) => {
            onChange(parseInt(event?.target.value));
          }}
          className="range range-xs w-full"
        />
        <div className="mt-2 flex w-full flex-row justify-between  text-primary/30">
          <span className="text-xs">{leftLabel}</span>
          <span className="text-xs">{rightLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
