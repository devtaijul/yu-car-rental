import { Locale } from "@/types/utils";

export const services = {
  en: [
    {
      icon: "Sparkles",
      title: "24/7 SELF-SERVICE",
      description:
        "Pick up your car whenever it suits you — day or night, fully contactless. No waiting, no hassle.",
    },
    {
      icon: "Car",
      title: "No Hidden Fees",
      description:
        "Transparency is at the core of our values. With YU Car Rental, what you see is what you get. Say goodbye to hidden charges and unexpected fees.",
    },
    {
      icon: "Clock",
      title: "Free pick-up service",
      description:
        "No more waiting in line! We offer a hassle free pick-up process, with our free pick-up service. Your rental vehicle will be waiting for you, so you can get started on your Bonaire adventure right away.",
    },
    {
      icon: "Shield",
      title: "100% Coverage Package",
      description:
        "With our 100% coverage package, you'll enjoy peace of mind as there's no deposit required, and you won't need to worry about paying for scratches or dents.",
    },
    {
      icon: "Percent",
      title: "Up To 15% Discount",
      description:
        "Book online and save! Get up to 15% off on reservations of 7 days or longer.",
    },
    {
      icon: "Plane",
      title: "Airport Pickup",
      description:
        "Upon arriving at the airport, your car will be in the airport parking lot, so you can just hop in and drive off.",
    },
  ],

  nl: [
    {
      icon: "Sparkles",
      title: "24/7 ZELFBEDIENING",
      description:
        "Haal je auto op wanneer het jou uitkomt — dag en nacht, volledig contactloos. Geen wachttijden, geen gedoe.",
    },
    {
      icon: "Car",
      title: "Geen Verborgen Kosten",
      description:
        "Transparantie staat bij ons centraal. Bij YU Car Rental is wat je ziet ook wat je betaalt. Geen verborgen kosten of verrassingen.",
    },
    {
      icon: "Clock",
      title: "Gratis Ophaalservice",
      description:
        "Niet meer in de rij wachten! Met onze gratis ophaalservice staat je huurauto direct voor je klaar, zodat je meteen aan je Bonaire-avontuur kunt beginnen.",
    },
    {
      icon: "Shield",
      title: "100% Dekkingspakket",
      description:
        "Met ons 100% dekkingspakket heb je volledige gemoedsrust. Geen borg nodig en geen zorgen over krassen of deuken.",
    },
    {
      icon: "Percent",
      title: "Tot 15% Korting",
      description:
        "Boek online en bespaar! Ontvang tot 15% korting bij reserveringen van 7 dagen of langer.",
    },
    {
      icon: "Plane",
      title: "Ophalen op de Luchthaven",
      description:
        "Bij aankomst op de luchthaven staat je auto al voor je klaar op de parkeerplaats. Instappen en wegrijden maar.",
    },
  ],

  es: [
    {
      icon: "Sparkles",
      title: "AUTOSERVICIO 24/7",
      description:
        "Recoge tu coche cuando quieras — de día o de noche, totalmente sin contacto. Sin esperas ni complicaciones.",
    },
    {
      icon: "Car",
      title: "Sin Costes Ocultos",
      description:
        "La transparencia es fundamental para nosotros. Con YU Car Rental, lo que ves es lo que pagas. Sin cargos ocultos ni sorpresas.",
    },
    {
      icon: "Clock",
      title: "Servicio de Recogida Gratuito",
      description:
        "¡Olvídate de las filas! Con nuestro servicio gratuito de recogida, tu coche estará listo para que empieces tu aventura en Bonaire de inmediato.",
    },
    {
      icon: "Shield",
      title: "Paquete de Cobertura 100%",
      description:
        "Con nuestro paquete de cobertura total, no necesitas depósito y no tendrás que preocuparte por rayones o abolladuras.",
    },
    {
      icon: "Percent",
      title: "Hasta 15% de Descuento",
      description:
        "Reserva online y ahorra. Obtén hasta un 15% de descuento en reservas de 7 días o más.",
    },
    {
      icon: "Plane",
      title: "Recogida en el Aeropuerto",
      description:
        "Al llegar al aeropuerto, tu coche te estará esperando en el estacionamiento. Solo súbete y conduce.",
    },
  ],
};

export const getServices = (locale: Locale) => {
  return services[locale];
};
