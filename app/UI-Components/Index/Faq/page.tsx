"use client";

import Image from "next/image";
import faqBanner from "@/public/img/faq-banner.jpg"
import { useState } from "react";

const faqData = [
  {
    id: "01",
    question: "What interior design services do you offer?",
    answer: "Our interior design services cover everything"
  }
]

export default function Faqs() {

  const [openIndex, setOpenIndex] = useState(null);

  const togle = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <>
      <div className="px-[8%] lg:px-[12%] py-30">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/3 title pt-8">
            <span className="rounded-full title-span border border-gray-400 px-6 GolosText uppercase font-bold">
              Popular Queries
            </span>
          </div>
          <div className="w-full lg:w-2/3">
            <h1 className="CalSans text-4xl md:text-7xl mb-5">
              Quick and clear{" "}
              <span className="text-(--prim)">Answers To Your Key</span>{" "}
              services
            </h1>
            <p className="text-gray-400 GolosText">
              We specialize in transforming visions into reality. Explore our
              portfolio of innovative architectura
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 py-10">
          <div className="w-full lg:w-1/1">
            <div className="space-y-4 w-full">
              {faqData.map((item, index)=>(
                <div
                  key={index}
                  className={`overflow-hidden py-2 transition-all duration-300 border-b border-gray-300 ${openIndex === index ? "" : ""}`}
                >
                  <button 
                    className="w-full flex justify-between items-center py-4 text-left focus:outline-none cursor-pointer"
                    onClick={() => toggle(index)}
                  >
                    <h3 className="text-3xl font-semibold text-(--prim)">{item.id}</h3>
                    <span className="text-2xl md:text-3xl GolosText font-semibold text-gray-800">
                      {item.question}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
