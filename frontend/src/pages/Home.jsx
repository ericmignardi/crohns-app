import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="container mx-auto py-4">
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4 text-center md:text-left">
          <div className="flex flex-col justify-center items-center md:items-start gap-4">
            <h1 className="text-6xl">Better Your Health</h1>
            <p className="text-3xl text-[var(--gray)]">
              Tailored recipes and real-time chat to promote discussion.
            </p>
            <Link to="/recipes">
              <button className="btn rounded-full bg-[var(--teal)]">
                Get Started
              </button>
            </Link>
          </div>
          <div>
            <img src="/hero.png" alt="Hero Picture" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
