"use client";

import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { landingItems } from "@/components/landing/landingData";
import DockNav from '@/components/DockNav';


function LandingPage() {
  return (
      <div className="select-none min-h-screen bg-charcoal p-8">
        <div className="max-w-7xl mx-auto pb-24 md:pb-0">
          <div className="text-center mb-12">
            <img src="/assets/logo.svg" alt="tomeTalk logo" className="h-36 w-36 mx-auto" />
            <p className="text-xl text-charmPink max-w-2xl mx-auto">
              Discover, review, and discuss your favorite books with a passionate community of readers.
            </p>
          </div>
          
          <BentoGrid className="mx-auto md:auto-rows-[20rem] md:pb-20">
            {landingItems.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={cn("[&>p:text-lg]", item.className)}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </div>
        <DockNav />
      </div>
    );
}

export default LandingPage;
