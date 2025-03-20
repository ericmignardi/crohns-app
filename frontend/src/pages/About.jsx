import React from "react";

const About = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center gap-4 min-h-screen">
      <h1 className="text-4xl">About Us</h1>
      <p className="text-[var(--gray)]">
        Welcome to Wellness, a community-driven platform dedicated to supporting
        individuals living with Crohn's disease. Our mission is simple: to help
        you navigate the challenges of living with Crohn's by providing
        tailored, easy-to-follow recipes and a space for real-time discussion
        and support.
        <br />
        <br />
        Living with Crohn’s disease can make meal planning and maintaining a
        balanced diet difficult. That's why we offer a curated selection of
        recipes designed specifically for people with Crohn's. Whether you're
        looking for soothing meals that are gentle on your digestive system or
        nutrient-dense dishes to support your health, our recipes are crafted
        with care to meet your unique dietary needs.
        <br />
        <br />
        But we don’t stop at just recipes. We understand that the journey with
        Crohn's can be isolating, and finding others who truly understand can be
        tough. That’s why we’ve built a real-time chat feature, creating a space
        for you to connect with others who are walking the same path. Share
        experiences, offer advice, or simply find comfort in knowing you're not
        alone. Our community is here to support you every step of the way.
        <br />
        <br />
        At Wellness, we believe that a healthy lifestyle isn’t just about food;
        it’s about creating a supportive network, staying informed, and finding
        peace in your daily life. Whether you're newly diagnosed or a long-time
        warrior, we’re here to empower you with the tools, resources, and
        connections you need to live your healthiest, happiest life with
        Crohn's.
      </p>
    </div>
  );
};

export default About;
