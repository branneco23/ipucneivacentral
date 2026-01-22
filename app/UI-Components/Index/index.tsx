import Hero from "./Hero/page";
import About from "./About/page";
import Paralex from "./Paralax/page";
import Services from "./Services/page";
import Expertise from "./Expertise/page";
import PrincingPlans from "./PricingPlans/page";
import Testimonial from "./Testimonial/page"
import Faqs from "./Faq/page"
import Banner from "./Banner/page"
import Blog from "./Blogs/page"

export default function index() {
  return (
    <>
        <Hero/>
        <About/>
        <Services/>
        <PrincingPlans/>
        <Paralex/>
        <Expertise/>
        <Testimonial/>
        <Faqs/>
        <Banner/>
        <Blog/>
    </>
  )
}