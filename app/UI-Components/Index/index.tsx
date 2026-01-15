import Hero from "./Hero/page";
import About from "./About/page";
import Paralex from "./Paralax/page";
import Services from "./Services/page";
import Expertise from "./Expertise/page";

export default function index() {
  return (
    <>
        <Hero/>
        <About/>
        <Paralex/>
        <Services/>
        <Expertise/>
    </>
  )
}