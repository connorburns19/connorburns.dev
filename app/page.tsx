import { Nav } from "./_components/Nav";
import { Hero } from "./_components/sections/Hero";
import { About } from "./_components/sections/About";
import { Experience } from "./_components/sections/Experience";
import { Projects } from "./_components/sections/Projects";
import { Contact } from "./_components/sections/Contact";
import { Footer } from "./_components/sections/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
