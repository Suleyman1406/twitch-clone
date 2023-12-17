import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";

interface IUrlCardProps {
  value: string | null;
}
export const UrlCard = ({ value }: IUrlCardProps) => {
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="lg:flex items-center gap-x-10">
        <p className="font-semibold shrink-0 pb-2 lg:pb-0 w-24">Server Url</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input disabled placeholder="Server URL" value={value || ""} />
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};
