import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { MainSection } from "@/components/sections/main-section";
import { Nav } from "@/components/sections/nav";
import { SideNav } from "@/components/sections/side-nav";

export function AppLayout() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col font-body">
      <Nav />
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <button
          className="md:hidden fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground p-2 rounded-full shadow-lg"
          onClick={() => setIsSideNavOpen(!isSideNavOpen)}
        >
          {isSideNavOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
        <div
          className={`${
            isSideNavOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:static top-0 left-0 h-full w-64 z-40 md:z-auto`}
        >
          <SideNav />
        </div>
        <div className="flex-1 overflow-auto">
          <MainSection />
        </div>
      </div>
    </div>
  );
}
