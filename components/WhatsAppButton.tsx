import { MessageCircle } from "lucide-react";
import { WhatsAppTransparentIcon } from "./icons/whatsapp_transparent.icon";
import WhatsappIcon from "./icons/WhatsappIcon";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/1234567890"
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
