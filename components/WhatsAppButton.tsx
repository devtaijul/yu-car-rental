import WhatsappIcon from "./icons/WhatsappIcon";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/+5997955565"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <WhatsappIcon />
    </a>
  );
};

export default WhatsAppButton;
