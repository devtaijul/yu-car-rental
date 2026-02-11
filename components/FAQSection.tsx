"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do I Need An International Driver's License On Bonaire?",
      answer:
        "No, a valid driver's license is sufficient to rent a car on Bonaire.",
    },
    {
      question: "Is My US Driver's License Valid On Bonaire?",
      answer:
        "Yes, US driver's licenses are accepted for car rentals on Bonaire.",
    },
    {
      question: "What Is The Minimum Age To Rent A Car?",
      answer:
        "The minimum age to rent a car is 21 years old. Drivers under 25 may incur a young driver surcharge.",
    },
    {
      question: "How Do I Reset My Pin?",
      answer:
        "You can reset your PIN by contacting our customer service or through the self-service portal.",
    },
    {
      question: "What Is Required To Use Digital Banking?",
      answer:
        "You'll need a valid ID, a linked bank account, and to complete our digital verification process.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-linear-to-b from-[hsl(193,25%,78%)] to-[hsl(193,30%,72%)]">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <span className="section-badge mb-4 bg-card text-foreground border border-border">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-display text-foreground">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  " overflow-hidden transition-all duration-300",
                  isOpen
                    ? "bg-primary text-primary-foreground"
                    : "bg-[hsl(193,20%,82%)] text-foreground hover:bg-[hsl(193,22%,78%)]",
                )}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between px-5 md:px-6 py-4 text-left"
                >
                  <span
                    className={cn(
                      "font-medium text-sm md:text-base",
                      isOpen ? "text-primary-foreground" : "text-foreground",
                    )}
                  >
                    {faq.question}
                  </span>
                  <span className="shrink-0 ml-4">
                    {isOpen ? (
                      <Minus className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </span>
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <p
                    className={cn(
                      "px-5 md:px-6 pb-4 text-sm",
                      isOpen
                        ? "text-primary-foreground/90"
                        : "text-muted-foreground",
                    )}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
