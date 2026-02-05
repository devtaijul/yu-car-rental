import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
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

  return (
    <section className="py-20 bg-linear-to-b from-[hsl(193,20%,75%)] to-[hsl(193,25%,70%)]">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <span className="section-badge mb-4 bg-primary/20 text-primary">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-display text-foreground">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-card border-0 rounded-xl overflow-hidden shadow-sm data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline data-[state=open]:gradient-teal data-[state=open]:text-primary-foreground [&[data-state=open]>svg]:text-primary-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground bg-card">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
