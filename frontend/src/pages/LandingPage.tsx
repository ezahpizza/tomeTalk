"use client";

import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { landingItems } from "@/components/landing/landingData";
import DockNav from '@/components/DockNav';


export function BentoGridThirdDemo() {
  return (
      <div className="min-h-screen bg-charcoal p-8">
        <div className="max-w-7xl mx-auto pb-24 md:pb-0">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              tome<span className="text-charmPink">Talk</span>
            </h1>
            <p className="text-xl text-vioBlue max-w-2xl mx-auto">
              Discover, review, and discuss your favorite books with a passionate community of readers.
            </p>
          </div>
          
          <BentoGrid className="mx-auto md:auto-rows-[20rem]">
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

export const LandingPage = BentoGridThirdDemo;
