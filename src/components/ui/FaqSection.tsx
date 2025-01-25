"use client";

import { useBlackData } from "@/context/BlackDataContext";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type FaqTopic = {
  topic: string;
  questions: {
    question: string;
    answer: string;
  }[];
};

export default function FaqSection() {
  const { data } = useBlackData();
  const [faqData, setFaqData] = useState<FaqTopic[]>([]);

  useEffect(() => {
    if (data && data.length > 0 && data[0].about?.faqs) {
      setFaqData(data[0].about.faqs);
    }
  }, [data]);

  return (
    <div className="flex flex-col max-w-4xl mx-auto p-2">
      <div
        id="faqsLabel"
        className="font-bold font-sans text-2xl text-[#333] mb-6"
      >
        FAQs
      </div>
      {faqData.map((topic, topicIndex) => (
        <div key={topicIndex} className="mb-8">
          <h2 className="font-bold font-sans text-[16px] uppercase mb-4">
            {topic.topic}
          </h2>
          {topic.questions.map((qa, qaIndex) => (
            <div key={qaIndex} className="mb-4">
              <h3 className="font-bold font-sans text-[14px] mb-2">
                {qa.question}
              </h3>
              <p className="text-[14px] font-sans whitespace-pre-line mt-[-5px]">
                {qa.answer}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
