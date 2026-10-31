import React from "react";
import { Hero } from "@/components/home/hero/Hero";
import FeaturedSection from "@/components/home/feature/FeaturedSection";
import Category from "@/components/home/category/Category";
import HowBookingWork from "@/components/home/howBookingWork/HowBookingWork";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Category />
      <HowBookingWork />
    </>
  );
};

export default HomePage;
