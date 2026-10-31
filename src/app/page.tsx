import React from "react";
import { Hero } from "@/components/home/hero/Hero";
import FeaturedSection from "@/components/home/feature/FeaturedSection";
import Category from "@/components/home/category/Category";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Category />
    </>
  );
};

export default HomePage;
