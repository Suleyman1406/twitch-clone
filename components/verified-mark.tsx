import { CheckIcon } from "lucide-react";

export const VerifiedMark = () => {
  return (
    <div className="flex items-center justify-center h-4 w-4 rounded-full bg-blue-600 p-0.5">
      <CheckIcon className="h-2.5 w-2.5 text-primary stroke-[4px]" />
    </div>
  );
};
