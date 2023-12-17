import { Volume1Icon, Volume2Icon, VolumeXIcon } from "lucide-react";

import { Hint } from "@/components/hint";
import { Slider } from "@/components/ui/slider";

interface IVolumeControlProps {
  onChange: (value: number) => void;
  value: number;
}

export const VolumeControl = ({ value, onChange }: IVolumeControlProps) => {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;

  let Icon = isMuted ? VolumeXIcon : isAboveHalf ? Volume2Icon : Volume1Icon;

  const label = isMuted ? "Unmute" : "Mute";

  const handleChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <button
          onClick={() => onChange(isMuted ? 50 : 0)}
          className="text-white hover:bg-white/10 p-1.5 rounded-lg"
        >
          <Icon className="h-6 w-6" />
        </button>
      </Hint>
      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={1}
      />
    </div>
  );
};
