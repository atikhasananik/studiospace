import React from "react";
import { Hero } from "@/components/home/hero/Hero";
import FeaturedSection from "@/components/home/feature/FeaturedSection";
import Category from "@/components/home/category/Category";
import HowBookingWork from "@/components/home/howBookingWork/HowBookingWork";
import HostGuarantee from "@/components/home/guarantee/HostGuarantee";
import AboutSection from "@/components/home/about/AboutSection";
import FAQSection from "@/components/home/faq/FAQSection";
import WhatWeDoSection from "@/components/home/whatWeDo/WhatWeDoSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Find Creative Studio Spaces for Rent",
  description:
    "Discover and book distinctive photography, film, podcast, music, and production studios. StudioSpace connects creators with spaces built for their next project.",
  path: "/",
});

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Category />
      <HostGuarantee />
      <AboutSection />
      <WhatWeDoSection />
      <HowBookingWork />
      <FAQSection />
    </>
  );
};

export default HomePage;
