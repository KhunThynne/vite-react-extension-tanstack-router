import { ThemeProvider } from "next-themes";
import { Toaster } from "@/shared/components/ui/sonner";
import { SidebarProvider } from "../shared/contexts/ProviderSidebar";
import { DialogProvider } from "../shared/libs/dialog/DialogProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function Provider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <DialogProvider>
          <SidebarProvider>
            <Toaster />
            {children}
          </SidebarProvider>
        </DialogProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
