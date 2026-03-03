import { Loader2 } from "lucide-react";

export const PendingComponent = () => {
  return (
    <div className="flex items-center justify-center p-4 w-full h-full min-h-[50vh]">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
};
