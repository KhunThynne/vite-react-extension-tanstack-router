import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@/shared/components/ui/dialog";


export type StatusType = "loading" | "success" | "error";

interface OverlayProps {
  isVisible: boolean;
}

export function Overlay({ isVisible }: OverlayProps) {
  return (
    <Dialog open={isVisible}>
      <DialogOverlay className="backdrop-blur-xl " />
      <DialogContent
        showCloseButton={false}
        className="data-[state=open]:animate-in data-[state=closed]:animate-out z-50 flex flex-col items-center justify-center sm:max-w-xs"
      >
        <DialogHeader className="items-center text-center space-y-4">
          <div className="flex items-center justify-center">
            {/* {statusType === "loading" && (
              <Spinner className="size-12 text-primary" />
            )}

            {statusType === "success" && (
              <CheckCircle className="size-12 text-green-500" />
            )}

            {statusType === "error" && (
              <XCircle className="size-12 text-red-500" />
            )} */}
          </div>
          <DialogTitle className="text-xl font-semibold text-foreground">
            HepPost Assistant
          </DialogTitle>
          <DialogDescription>TEst {/* {statusText} */}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
