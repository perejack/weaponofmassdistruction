import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/scroll-to-top";
import Index from "./pages/Index";
import InstagramBoost from "./pages/InstagramBoost";
import TikTokBoost from "./pages/TikTokBoost";
import YouTubeBoost from "./pages/YouTubeBoost";
import FacebookBoost from "./pages/FacebookBoost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/instagram-boost" element={<InstagramBoost />} />
          <Route path="/tiktok-boost" element={<TikTokBoost />} />
          <Route path="/youtube-boost" element={<YouTubeBoost />} />
          <Route path="/facebook-boost" element={<FacebookBoost />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
