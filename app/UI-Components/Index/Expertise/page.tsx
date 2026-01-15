"use client";

import Image from "next/image";
import expertise1 from "@/public/img/expertise1.jpg";
import expertise2 from "@/public/img/expertise2.jpg";
import expertise3 from "@/public/img/expertise3.jpg";
import expertise4 from "@/public/img/expertise4.jpg";

import expertiseSlide1 from "@/public/img/banner-slide-1.jpg";
import expertiseSlide2 from "@/public/img/banner-slice-2.jpg";
import expertiseSlide3 from "@/public/img/banner-slice-3.jpg";

const ExpertiseData = [
  {
    id: "1",
    title: "Renovation and relmodeling",
    desc: "Eget odin non ac mi.",
    image: expertise1
  },
  {
    id: "2",
    title: "Renovation and relmodeling",
    desc: "Eget odin non ac mi.",
    image: expertise2
  },
  {
    id: "3",
    title: "Renovation and relmodeling",
    desc: "Eget odin non ac mi.",
    image: expertise3
  },
  {
    id: "4",
    title: "Renovation and relmodeling",
    desc: "Eget odin non ac mi.",
    image: expertise4
  }
]

export default function Expertise() {
  return (
    <>
      <div className="expertise bg-[#00338d]">
        <div className="px-[8%] lg:px-[12%] md:py-50 pt-10 md:pb-[25%] relative">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full pt-8">
              <span className="rounded-full title-span border border-gray-400 px-6 GolosText uppercase font-bold">
                Nuestras experiencias
              </span>
            </div>
            <div className="w-full lg:w-2/3">
              <h1 className="CalSans text-4xl md:text-7xl">
                Curating the perfect
                <span className="text-(--white)"> pieces to complete</span>{" "}
                Timeless and Inspiri
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {ExpertiseData.map((item, idx) => (
              <div key={idx} className="exprtise-card" 
                style={{marginTop: `${idx * 40}px`}}
              >
                <div className="expertise-image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full rounded-2xl"
                  />
                </div>
                <div className="expertise-info my-5">
                  <h1 className="text-3xl CalSans text-white border-b border-b border-gray-500/50 pb-5 w-full lg:w-[80%]">{item.title}</h1>
                  <p className="text-gray-400 mt-3">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
