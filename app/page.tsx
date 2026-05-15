import { Nav } from "./_components/Nav";
import { Hero } from "./_components/sections/Hero";
import { About } from "./_components/sections/About";
import { Projects } from "./_components/sections/Projects";
import { Freelance } from "./_components/sections/Freelance";
import { Footer } from "./_components/sections/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Freelance />
      </main>
      <Footer />
    </>
  );
}
