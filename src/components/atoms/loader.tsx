import { Loader2Icon } from "lucide-react";

function Loader() {
  return (
    <div className="grid w-full place-items-center py-6">
      <Loader2Icon className="h-6 w-6 animate-spin" />
    </div>
  );
}

export { Loader };
