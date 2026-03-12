import { Locale } from "@/types/utils";

export const services = {
  en: [
    {
      icon: "Sparkles",
      title: "Zero Deductible with 100% Coverage Package",
      description:
        "With our 100% coverage package, you'll enjoy peace of mind as there's no deposit required, and you won't need to worry about inspecting for scratches or dents. All damage, even to the rented vehicle, is fully covered.",
    },
    {
      icon: "Car",
      title: "100% Flexible Cancellation Policy",
      description:
        "Life is full of surprises, and we understand that. With our flexible cancellation policy, you only pay for the days you rent, allowing you the freedom to adjust your plans without any hassles.              ",
    },
    {
      icon: "Clock",
      title: "New and Fuel Efficient  Cars and Unlimited Miles ",
      description:
        "Cruise around the island in style and eco-friendliness with our top-of-the-line SUV's and pickups. Enjoy a smooth and efficient ride while exploring Bonaire's stunning landscapes. ",
    },
    {
      icon: "Shield",
      title: "24/7 Self-Service",
      description:
        "Pick up your car whenever it suits you — day or night, fully contactless. No waiting, no hassle.",
    },
    {
      icon: "Percent",
      title: "No Hidden Fees",
      description:
        "Transparency is at the core of our values. With YU Car Rental, what you see is what you get. Say goodbye to hidden charges and unexpected fees.",
    },
    {
      icon: "Plane",
      title: "Free pick-up service",
      description:
        "No more waiting in line! We offer a hassle free pick-up process, with our free pick-up service. Your rental vehicle will be waiting for you, so you can get started on your Bonaire adventure right away.",
    },
    {
      icon: "Shield",
      title: "Multilingual Team",
      description:
        "We speak your language. Our support is available in Dutch, English, Spanish and Papiamentu.",
    },
    {
      icon: "Percent",
      title: "Local Expertise",
      description:
        "As a local business, we know Bonaire inside and out — and we’re happy to share our secret  tips with you.",
    },
    {
      icon: "Plane",
      title: "Effortless Flow",
      description:
        "From perfectly prepared cars to clear instructions, we make sure your journey begins relaxed, smooth and stress-free.",
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
    {
      icon: "Shield",
      title: "Multilingual Team",
      description:
        "We speak your language. Our support is available in Dutch, English, Spanish and Papiamentu.",
    },
    {
      icon: "Percent",
      title: "Local Expertise",
      description:
        "As a local business, we know Bonaire inside and out — and we’re happy to share our secret  tips with you.",
    },
    {
      icon: "Plane",
      title: "Effortless Flow",
      description:
        "From perfectly prepared cars to clear instructions, we make sure your journey begins relaxed, smooth and stress-free.",
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
    {
      icon: "Shield",
      title: "Multilingual Team",
      description:
        "We speak your language. Our support is available in Dutch, English, Spanish and Papiamentu.",
    },
    {
      icon: "Percent",
      title: "Local Expertise",
      description:
        "As a local business, we know Bonaire inside and out — and we’re happy to share our secret  tips with you.",
    },
    {
      icon: "Plane",
      title: "Effortless Flow",
      description:
        "From perfectly prepared cars to clear instructions, we make sure your journey begins relaxed, smooth and stress-free.",
    },
  ],
};

export const getServices = (locale: Locale) => {
  return services[locale];
};

export const whyNeedCarItems: Record<
  string,
  {
    id: string;
    image: string;
    category: string;
    title: string;
    description: string;
  }[]
> = {
  en: [
    {
      id: "1",
      image: "/bonaire/story-1.jpeg",
      category: "SHORE DIVING",
      title: "DIVE ON YOUR TERMS",
      description:
        "When you land on Bonaire, you feel it instantly: this island breathes calm. The sky is clear, the sea shifts from turquoise to deep blue, and the coastline seems to welcome you personally. As you pick up your rental car at YU Car Rental, the real vacation feeling begins.",
    },
    {
      id: "2",
      image: "/bonaire/story-2.jpeg",
      category: "ISLAND SUNSET",
      title: "THE GIFT OF SUNSET",
      description:
        "On Bonaire, every sunset feels like a gift. The sky turns from gold to deep orange while the palms sway gently in the wind. It’s the kind of moment that makes you pause — and reminds you exactly why this island is so special.",
    },
    {
      id: "3",
      image: "/bonaire/story-3.jpeg",
      category: "ISLAND FREEDOM",
      title: "DISCOVER THE ISLAND",
      description:
        "On Bonaire, freedom feels like pure joy — clear waters, white sand, and moments that happen naturally. With your YU Car Rental car, you discover every hidden spot and every smile the island gives you. Bonaire shows you how beautiful life can be — every single day.",
    },
    {
      id: "4",
      image: "/bonaire/story-4.jpeg",
      category: "COASTAL DRIVE",
      title: "A ROMANTIC COASTLINE",
      description:
        "The day ends in warm colors and gentle waves. As you drive along the coast, you feel the romantic atmosphere found only on Bonaire — every hidden spot filled with peace, nature, and freedom. With your YU Car Rental car, you experience the island at your own pace: pure, light, and unforgettable.",
    },
    {
      id: "5",
      image: "/bonaire/story-5.jpeg",
      category: "HIDDEN NATURE",
      title: "WHERE NATURE WHISPERS",
      description:
        "Between the rocks and the clear blue water, you discover the quiet beauty and hidden nature of the island. It feels as if everything moves with you — even the birds seem to enjoy the peace that Bonaire has to offer. With your YU Car Rental car, you find places where life feels simpler and more beautiful.",
    },
    {
      id: "6",
      image: "/bonaire/story-6.jpeg",
      category: "WILDLIFE",
      title: "THE ISLAND'S NATURAL LIFE",
      description:
        "On Bonaire, nature seems to follow its own rhythm: flamingos stepping gracefully through the water and pelicans watching calmly from the rocks. As you travel across the island, every stop feels like a new chapter filled with color and life. With your YU Car Rental car, you reach places where nature surprises you and the island reveals its true character.",
    },
    {
      id: "7",
      image: "/bonaire/story-7.jpeg",
      category: "ISLAND AERIAL",
      title: "A MOSAIC OF THE SEA",
      description:
        "From the beautiful blue sky, Bonaire appears as a mosaic of turquoise sea, calm bays, and vibrant coastlines. As boats trace their paths across the sea, you discover the places where the island’s true energy comes alive — where freedom, color, and adventure blend into one unforgettable journey.",
    },
    {
      id: "8",
      image: "/bonaire/story-8.jpeg",
      category: "BEACH LIFE",
      title: "THE PEACE OF BACHELOR'S BEACH",
      description:
        "At the edge of Bonaire, where the turquoise sea blends into soft, clear light, Bachelor’s Beach feels like a quiet invitation to let everything go for a moment. People float peacefully in the warm water while gentle waves whisper against the rocks, as if the island is welcoming you personally. With your YU Car Rental car, you reach the places where simplicity, calm, and pure island freedom come together in a moment you’ll never forget.",
    },
    {
      id: "9",
      image: "/bonaire/story-9.jpeg",
      category: "SNORKELING",
      title: "THE MAGIC OF 1000 STEPS",
      description:
        "At 1000 Steps, it feels as if the world slows down for a moment: the brilliant, crystal‑blue sea sparkles under the sun as it dances across the waves, and each step down brings you closer to a hidden piece of paradise. Snorkelers glide between the coral as if they become part of the undersea world itself, surrounded by colors you won’t find anywhere else. At this special point on the island of Bonaire, you experience how peace, nature, and adventure come together in a moment that stays with you long after you leave.",
    },
    {
      id: "10",
      image: "/bonaire/story-10.jpeg",
      category: "FLAMINGOS",
      title: "THE GUARDIANS OF BONAIRE",
      description:
        "All across the island, these magnificent flamingos appear like the quiet guardians of Bonaire’s natural beauty. Here too, among the mangroves, they move gracefully through the shallow water — elegant, almost rhythmic, as if they instinctively know this is their domain. The gentle breeze, the rustling leaves, and the shimmering water turn this place into a scene where nature tells its own story. A moment of pure tranquility, color, and island magic that you can experience only on Bonaire.",
    },
    {
      id: "11",
      image: "/bonaire/story-11.jpeg",
      category: "NATIONAL PARK",
      title: "WILD BEAUTY OF WASHINGTON SLAGBAAI",
      description:
        "On this photo you see only a small part of it, but deep inside Washington Slagbaai National Park you find a place where Bonaire’s pure beauty comes together: rugged rocks, towering cacti, and a crystal‑clear sea that forms the backdrop for a landscape that feels almost unreal. Here, silence and nature meet in a rare harmony, as if the island reveals its most hidden side for just a moment. It’s an experience that stays with you — simple, wild, and unforgettable.",
    },
    {
      id: "12",
      image: "/bonaire/story-12.jpeg",
      category: "ISLAND PEACE",
      title: "A MOMENT OF PURE FREEDOM",
      description:
        "This is endless freedom — a place where time settles into silence and the sea whispers as if it wants to touch your heart. Here, at the edge of the island, everything feels softer: the light, the air, the gentle movement of the waves. It’s as if Bonaire embraces you for a moment and shows you how love and peace can exist together. It’s one of those moments you don’t just see, but feel deep inside — warm, pure, and unforgettable.",
    },
    {
      id: "13",
      image: "/bonaire/story-13.jpeg",
      category: "ISLAND HISTORY",
      title: "THE STORY OF THE SALT PANS",
      description:
        "In the south of Bonaire lies a landscape that is both beautiful and deeply burdened with history. The vast salt pans create a serene, almost surreal world of white and blue, yet beneath that quiet surface rests a past that has profoundly shaped the island. From the 17th to the 19th century, enslaved Africans were forced to work here under inhumane conditions to harvest the precious ‘white gold.’ A little further along the coast, the small slave huts built in 1850 still stand, silent witnesses to a past that must never be forgotten. Today, the salt pans are operated on a large scale by the company Cargill.",
    },
    {
      id: "14",
      image: "/bonaire/story-14.jpeg",
      category: "SALT PAN LANDSCAPE",
      title: "THE COLORS OF BONAIRE",
      description:
        "In the south of Bonaire, a landscape unfolds that feels almost unreal in its beauty. From above, you can see the road lying like a thin, elegant ribbon between the turquoise sea and the vast salt pans. On one side moves the calm, crystal‑blue sea shimmering in the sunlight, and on the other side the salt flats glow in soft pink tones, bright white, and deep blue. \n Together, these colors form a mosaic that only Bonaire can paint — a living artwork where light, sea, and salt meet in the most magical way.",
    },
    {
      id: "15",
      image: "/bonaire/story-15.jpeg",
      category: "ISLAND SUNSET",
      title: "WHEN SKY MEETS SEA",
      description:
        "When the sun sinks below the horizon, the sky turns shades of gold and amber. The sea moves gently beneath the last light of day, while an airplane glides gracefully above the sea as if it were dancing along with the evening. In the distance, a ship drifts through the sunlight, and a quiet sailboat finds its way across the shimmering surface of the sea. \n It is a moment where everything slows down — where sky and sea touch, and Bonaire reveals its most enchanting face. A scene you don’t just see, but feel deep within.",
    },
    {
      id: "16",
      image: "/bonaire/story-16.jpeg",
      category: "LIGHTHOUSE",
      title: "THE WILLEMSTOREN LIGHTHOUSE",
      description:
        "Where the deep blue sky meets the quiet southern coast of Bonaire, the Willemstoren stands as an elegant guardian at the edge of the sea. On this once‑feared point, hidden coral reefs caused countless ships to run aground, and with every tide the island’s history washed ashore. Since its construction in 1837, the red‑striped lighthouse has guided sailors safely past this coastline.\n Today the surroundings carry a gentle sense of enchantment. The sea glides softly along the rocks, the evening light settles as a warm glow above the horizon, and the lighthouse overlooks a landscape that feels both timeless and intimate. Here, sky and sea meet in a harmony that touches you instantly.\n A visit to this place is more than a beautiful view — it becomes a moment you carry with you long after you continue your journey.",
    },
    {
      id: "17",
      image: "/bonaire/story-17.jpeg",
      category: "OCEAN VIEW",
      title: "LOOKING INTO THE HORIZON",
      description:
        "Along the shoreline, where freedom becomes almost tangible, you look out over the endless horizon. The ocean stretches before you as a place where thoughts settle and new insights quietly take shape. In that moment, you feel depth — not because you search for it, but because the sea offers it to you: clear, honest, without noise. You breathe in the calm, look far ahead, leave the pressure of the day behind, and embrace the simple truth that life is bigger than what you carry today. Here you find space. Here you find yourself. \n Wil je dat ik deze Engelse versie nog iets krachtiger of meer richting YU Car Rental positioneer?",
    },
    {
      id: "18",
      image: "/bonaire/story-18.jpeg",
      category: "DIVING",
      title: "A WORLD BENEATH THE SURFACE",
      description:
        "Beneath the surface of Bonaire, a world unfolds that you won’t find anywhere else. As a diver moves between the coral, all sense of hurry disappears — only the movement of fish and the rhythm of your breath remain. Freedom feels different here: quiet, deep, and honest. The ocean shows you how small you are, yet how big your thoughts can become. Between the colorful reef and the endless blue, you realize that life is not about speed, but about being truly present. And this is exactly what makes Bonaire one of the best dive locations in the world. When you rise back to the surface and the sunlight breaks through the waves, you carry that feeling with you: depth, space, freedom — the kind of experience that reminds you of what truly matters.",
    },
  ],
  nl: [
    {
      id: "1",
      image: "/bonaire/story-1.jpeg",
      category: "KUSTDUIKEN",
      title: "DUIKEN OP JOUW MANIER",
      description:
        "Wanneer je op Bonaire landt, voel je het meteen: dit eiland ademt rust. De lucht is helder, de zee kleurt van turquoise naar diepblauw, en de kustlijn lijkt je persoonlijk welkom te heten. Terwijl je je huurauto ophaalt bij YU Car Rental, begint het echte vakantiegevoel al.",
    },
    {
      id: "2",
      image: "/bonaire/story-2.jpeg",
      category: "ZONSONDERGANG",
      title: "EEN CADEAU VAN DE NATUUR",
      description:
        "Op Bonaire voelt elke zonsondergang als een cadeau. De lucht kleurt van goud naar diep oranje, terwijl de palmen zacht bewegen in de wind. Het is het soort moment dat je stil maakt — en precies laat voelen waarom dit eiland zo bijzonder is.",
    },
    {
      id: "3",
      image: "/bonaire/story-3.jpeg",
      category: "EILANDVRIJHEID",
      title: "ONTDEK HET EILAND",
      description:
        "Op Bonaire voelt vrijheid als pure vreugde: helder water, wit zand en momenten die vanzelf ontstaan. Met je auto van YU Car Rental ontdek je elke verborgen plek en elke lach die het eiland je geeft. Bonaire laat je voelen hoe mooi het leven kan zijn — elke dag opnieuw.",
    },
    {
      id: "4",
      image: "/bonaire/story-4.jpeg",
      category: "KUSTROUTE",
      title: "EEN ROMANTISCHE RIT LANGS DE KUST",
      description:
        "De dag eindigt in warme kleuren en zachte golven. Terwijl je langs de kust rijdt, voel je de romantische sfeer die alleen op Bonaire te vinden is — elke verborgen plek ademt rust, natuur en vrijheid. Met je auto van YU Car Rental beleef je het eiland op jouw tempo: puur, licht en onvergetelijk.",
    },
    {
      id: "5",
      image: "/bonaire/story-5.jpeg",
      category: "VERBORGEN NATUUR",
      title: "WAAR NATUUR TOT RUST KOMT",
      description:
        "Tussen de rotsen en het helderblauwe water ontdek je de stille schoonheid en verborgen natuur van het eiland. Het voelt alsof alles met je meeloopt — zelfs de vogels lijken te genieten van de rust die Bonaire te bieden heeft. Met je auto van YU Car Rental ontdek je plekken waar het leven eenvoudiger en mooier lijkt.",
    },
    {
      id: "6",
      image: "/bonaire/story-6.jpeg",
      category: "WILDLIFE",
      title: "HET RITME VAN DE NATUUR",
      description:
        "Op Bonaire lijkt de natuur haar eigen ritme te volgen: flamingo’s die elegant door het water stappen en pelikanen die rustig toekijken vanaf de rotsen. Terwijl je het eiland doorkruist, voelt elke stop als een nieuw hoofdstuk vol kleur en leven. Met je auto van YU Car Rental kom je op plekken waar de natuur je verrast en het eiland zijn echte karakter laat zien.",
    },
    {
      id: "7",
      image: "/bonaire/story-7.jpeg",
      category: "Luchtfoto",
      title: "EEN MOZAIËK VAN ZEE EN KUST",
      description:
        "Vanuit de prachtige blauwe lucht verschijnt Bonaire als een mozaïek van turkooizen zee, rustige baaien en levendige kustlijnen. Terwijl boten hun sporen over het water trekken, ontdek je de plekken waar de echte energie van het eiland tot leven komt — waar vrijheid, kleur en avontuur samenkomen in één onvergetelijke reis.",
    },
    {
      id: "8",
      image: "/bonaire/story-8.jpeg",
      category: "STRAND",
      title: "RUST BIJ BACHELOR’S BEACH",
      description:
        "Aan de rand van Bonaire, waar het turkoois van de zee overloopt in helder licht, ligt Bachelor’s Beach als een stille uitnodiging om even alles los te laten. Mensen drijven ontspannen in het warme water, terwijl de zachte golven tegen de rotsen fluisteren alsof het eiland je persoonlijk welkom heet. Met je auto van YU Car Rental kom je precies op dit soort plekken: waar eenvoud, rust en pure eilandvrijheid samenkomen in één moment dat je nooit meer vergeet.",
    },
    {
      id: "9",
      image: "/bonaire/story-9.jpeg",
      category: "SNORKELEN",
      title: "DE MAGIE VAN 1000 STEPS",
      description:
        "Bij 1000 Steps voelt het alsof de wereld even vertraagt: de schitterende, helderblauwe zee glinstert onder de zon die met de golven speelt, en elke stap naar beneden brengt je dichter bij een verborgen stukje paradijs. Snorkelaars zweven tussen het koraal alsof ze deel worden van het onderzeeleven zelf, omringd door kleuren die je nergens anders ziet. Op dit bijzondere punt van het eiland Bonaire ervaar je hoe rust, natuur en avontuur samenkomen in een moment dat je nog lang met je meedraagt.",
    },
    {
      id: "10",
      image: "/bonaire/story-10.jpeg",
      category: "FLAMINGO'S",
      title: "DE BESCHERMERS VAN HET EILAND",
      description:
        "Al over het eiland duiken deze schitterende flamingo’s op, alsof ze de stille bewakers zijn van Bonaire’s natuurlijke schoonheid. Ook hier, tussen de mangroven, bewegen ze rustig door het ondiepe water — elegant, bijna ritmisch, alsof ze precies weten dat dit hun domein is. De zachte bries, het ritselen van de bladeren en het spiegelende water maken dit tot een plek waar de natuur haar eigen verhaal vertelt. Een moment van pure rust, kleur en eilandmagie dat je alleen op Bonaire zo kunt ervaren.",
    },
    {
      id: "11",
      image: "/bonaire/story-11.jpeg",
      category: "NATIONAAL PARK",
      title: "DE WILDE SCHOONHEID VAN BONAIRE",
      description:
        "Op deze foto zie je slechts een klein deel ervan, maar diep in Washington Slagbaai National Park vind je een plek waar de pure schoonheid van Bonaire samenkomt: ruige rotsen, hoge cactussen en een kristalheldere zee die het decor vormt voor een landschap dat bijna onwerkelijk lijkt. Hier ontmoeten stilte en natuur elkaar in een zeldzame harmonie, alsof het eiland even zijn meest verborgen kant laat zien. Een moment dat je raakt — eenvoudig, wild en onvergetelijk.",
    },
    {
      id: "12",
      image: "/bonaire/story-12.jpeg",
      category: "EILANDRUST",
      title: "ONEINDIGE VRIJHEID",
      description:
        "Dit is oneindig genieten van de vrijheid — een plek waar de tijd zich neerlegt in stilte en de zee fluistert alsof ze je hart wil raken. Hier, aan de rand van het eiland, voelt alles zachter: het licht, de lucht, de beweging van de golven. Alsof Bonaire je even omarmt en laat zien hoe liefde en rust samen kunnen bestaan. Het is zo’n moment dat je niet alleen ziet, maar diep vanbinnen voelt — warm, puur en onvergetelijk.",
    },
    {
      id: "13",
      image: "/bonaire/story-13.jpeg",
      category: "GESCHIEDENIS",
      title: "DE ZOUTPANNEN VAN BONAIRE",
      description:
        "In het zuiden van Bonaire ligt een landschap dat zowel prachtig als beladen is. De uitgestrekte zoutpannen vormen vandaag een serene, bijna surrealistische wereld van wit en blauw, maar onder die stilte schuilt een geschiedenis die het eiland diep heeft gevormd. Van de 17e tot de 19e eeuw moesten tot slaaf gemaakte Afrikanen hier onder onmenselijke omstandigheden het kostbare ‘witte goud’ winnen. Iets verderop staan de kleine slavenhuisjes uit 1850 nog altijd overeind, als stille getuigen van een verleden dat nooit vergeten mag worden. Tegenwoordig worden de zoutpannen op grote schaal gebruikt door het bedrijf Cargill.",
    },
    {
      id: "14",
      image: "/bonaire/story-14.jpeg",
      category: "ZOUTLANDSCHAP",
      title: "DE KLEUREN VAN HET ZUIDEN",
      description:
        "In het zuiden van Bonaire ontvouwt zich een uitzicht dat bijna onwerkelijk mooi is. Vanuit de lucht zie je hoe de weg als een dun, elegant lint ligt tussen de turquoise zee en de uitgestrekte zoutpannen. Aan de ene kant beweegt de kalme, helderblauwe zee die in de zon schittert, en aan de andere kant lichten de zoutvlaktes op in zachte roze tinten, helder wit en diep blauw. De kleuren vormen samen een mozaïek dat alleen Bonaire zo kan schilderen — een levend kunstwerk waarin licht, zee en zout elkaar op de meest magische manier ontmoeten.",
    },
    {
      id: "15",
      image: "/bonaire/story-15.jpeg",
      category: "ZONSONDERGANG",
      title: "WAAR LUCHT EN ZEE ELKAAR RAKEN",
      description:
        "Wanneer de zon wegzakt achter de horizon, kleurt de hemel in goud en amber. De zee beweegt zacht onder het laatste licht, terwijl een vliegtuig sierlijk over de zee glijdt alsof het meedanst met de avond. In de verte schuift een schip door het zonlicht en zoekt een stille zeilboot haar weg over het glinsterende zeeoppervlak. Het is een moment waarin alles vertraagt — waar lucht en zee elkaar raken en Bonaire zijn meest betoverende gezicht laat zien. Een scène die je niet alleen ziet, maar diep vanbinnen voelt.",
    },
    {
      id: "16",
      image: "/bonaire/story-16.jpeg",
      category: "VUURTOREN",
      title: "DE WILLEMSTOREN",
      description:
        "Waar de diepblauwe hemel de stille zuidkust van Bonaire raakt, staat de Willemstoren als een elegante wachter aan de rand van de zee. Op deze plek, ooit gevreesd door zeelieden vanwege de verborgen koraalriffen, spoelde eeuwenlang de geschiedenis van het eiland aan met elke nieuwe golf. Sinds zijn bouw in 1837 heeft de rood-gestreepte toren talloze schepen veilig langs de kust geleid. Vandaag straalt de omgeving een zachte betovering uit. De zee glijdt rustig langs de rotsen, het avondlicht blijft als een warme gloed boven de horizon hangen, en de vuurtoren kijkt uit over een landschap dat tegelijk tijdloos en intiem aanvoelt. Hier komen lucht en zee samen in een harmonie die je meteen raakt. Een bezoek aan deze plek is meer dan een mooi uitzicht — het is een moment dat je meeneemt, lang nadat je weer verder reist.",
    },
    {
      id: "17",
      image: "/bonaire/story-17.jpeg",
      category: "OCEAAN UITZICHT",
      title: "KIJKEN NAAR DE HORIZON",
      description:
        "Langs het strand, waar vrijheid bijna tastbaar wordt, kijk je uit over de oneindige horizon. De oceaan ligt voor je als een plek waar gedachten tot rust komen en nieuwe inzichten ontstaan. In dat moment voel je diepgang — niet omdat je ernaar zoekt, maar omdat de zee het je geeft: helder, eerlijk, zonder ruis. Je ademt de rust in, kijkt ver vooruit, laat de drukte achter je en geniet van het eenvoudige besef dat het leven groter is dan wat je vandaag draagt. Hier vind je ruimte. Hier vind je jezelf.",
    },
    {
      id: "18",
      image: "/bonaire/story-18.jpeg",
      category: "DUIKEN",
      title: "EEN WERELD ONDER WATER",
      description:
        "Onder het oppervlak van Bonaire opent zich een wereld die je nergens anders vindt. Terwijl een duiker tussen het koraal beweegt, valt alle haast weg — alleen de beweging van vissen en het ritme van je adem blijft over. Hier voelt vrijheid anders: stil, diep en eerlijk. De oceaan laat je zien hoe klein je bent, maar ook hoe groot je kunt denken. Tussen het kleurrijke rif en het eindeloze blauw ontstaat het besef dat leven draait om bewust aanwezig zijn. En precies dit maakt Bonaire één van de beste duiklocaties ter wereld. Wanneer je weer bovenkomt, neem je dat gevoel mee: diepgang, ruimte, vrijheid — het soort ervaring dat je herinnert aan wat echt telt.",
    },
  ],
  es: [
    {
      id: "1",
      image: "/bonaire/story-1.jpeg",
      category: "BUCEO DESDE LA COSTA",
      title: "BUCEA A TU MANERA",
      description:
        "Cuando llegas a Bonaire, lo sientes de inmediato: esta isla respira calma. El cielo es claro, el mar cambia de turquesa a azul profundo, y la costa parece darte la bienvenida personalmente. Mientras recoges tu coche de alquiler en YU Car Rental, la verdadera sensación de vacaciones comienza.",
    },
    {
      id: "2",
      image: "/bonaire/story-2.jpeg",
      category: "ATARDECER",
      title: "UN REGALO DE LA NATURALEZA",
      description:
        "En Bonaire cada atardecer se siente como un regalo. El cielo cambia de dorado a un naranja profundo mientras las palmeras se mueven suavemente con el viento. Es el tipo de momento que te hace detenerte y sentir exactamente por qué esta isla es tan especial.",
    },
    {
      id: "3",
      image: "/bonaire/story-3.jpeg",
      category: "LIBERTAD EN LA ISLA",
      title: "DESCUBRE LA ISLA",
      description:
        "En Bonaire la libertad se siente como pura alegría: aguas cristalinas, arena blanca y momentos que surgen de forma natural. Con tu coche de YU Car Rental descubres cada rincón escondido y cada sonrisa que la isla te ofrece. Bonaire te muestra lo hermoso que puede ser la vida — cada día de nuevo.",
    },
    {
      id: "4",
      image: "/bonaire/story-4.jpeg",
      category: "RUTA COSTERA",
      title: "UN VIAJE ROMÁNTICO POR LA COSTA",
      description:
        "El día termina con colores cálidos y olas suaves. Mientras conduces por la costa, sientes la atmósfera romántica que solo se encuentra en Bonaire — cada lugar escondido respira paz, naturaleza y libertad. Con tu coche de YU Car Rental experimentas la isla a tu propio ritmo: pura, ligera e inolvidable.",
    },
    {
      id: "5",
      image: "/bonaire/story-5.jpeg",
      category: "NATURALEZA OCULTA",
      title: "DONDE LA NATURALEZA SUSURRA",
      description:
        "Entre las rocas y el agua azul cristalina descubres la belleza silenciosa y la naturaleza escondida de la isla. Se siente como si todo caminara contigo — incluso los pájaros parecen disfrutar de la paz que Bonaire tiene para ofrecer. Con tu coche de YU Car Rental descubres lugares donde la vida parece más simple y hermosa.",
    },
    {
      id: "6",
      image: "/bonaire/story-6.jpeg",
      category: "VIDA SILVESTRE",
      title: "EL RITMO DE LA NATURALEZA",
      description:
        "En Bonaire la naturaleza parece seguir su propio ritmo: flamencos caminando elegantemente por el agua y pelícanos observando tranquilamente desde las rocas. Mientras recorres la isla, cada parada se siente como un nuevo capítulo lleno de color y vida. Con tu coche de YU Car Rental llegas a lugares donde la naturaleza te sorprende y la isla muestra su verdadero carácter.",
    },
    {
      id: "7",
      image: "/bonaire/story-7.jpeg",
      category: "VISTA AÉREA",
      title: "UN MOSAICO DE MAR Y COSTA",
      description:
        "Desde el hermoso cielo azul, Bonaire aparece como un mosaico de mar turquesa, bahías tranquilas y costas vibrantes. Mientras los barcos dejan sus huellas sobre el agua, descubres los lugares donde la verdadera energía de la isla cobra vida — donde libertad, color y aventura se unen en un viaje inolvidable.",
    },
    {
      id: "8",
      image: "/bonaire/story-8.jpeg",
      category: "PLAYA",
      title: "LA PAZ DE BACHELOR’S BEACH",
      description:
        "En el borde de Bonaire, donde el mar turquesa se mezcla con una luz clara y suave, Bachelor’s Beach parece una tranquila invitación para dejarlo todo por un momento. Las personas flotan relajadas en el agua cálida mientras las suaves olas susurran contra las rocas, como si la isla te diera la bienvenida personalmente.",
    },
    {
      id: "9",
      image: "/bonaire/story-9.jpeg",
      category: "SNORKEL",
      title: "LA MAGIA DE 1000 STEPS",
      description:
        "En 1000 Steps parece que el mundo se ralentiza por un momento: el brillante mar azul cristalino brilla bajo el sol que danza sobre las olas, y cada paso hacia abajo te acerca a un pedazo oculto de paraíso.",
    },
    {
      id: "10",
      image: "/bonaire/story-10.jpeg",
      category: "FLAMENCOS",
      title: "LOS GUARDIANES DE BONAIRE",
      description:
        "Por toda la isla aparecen estos magníficos flamencos, como si fueran los silenciosos guardianes de la belleza natural de Bonaire. Entre los manglares se mueven elegantemente por el agua poco profunda.",
    },
    {
      id: "11",
      image: "/bonaire/story-11.jpeg",
      category: "PARQUE NACIONAL",
      title: "LA BELLEZA SALVAJE DE BONAIRE",
      description:
        "En lo profundo del Parque Nacional Washington Slagbaai encuentras un lugar donde la belleza pura de Bonaire se reúne: rocas escarpadas, cactus altos y un mar cristalino.",
    },
    {
      id: "12",
      image: "/bonaire/story-12.jpeg",
      category: "PAZ DE LA ISLA",
      title: "LIBERTAD INFINITA",
      description:
        "Esto es libertad infinita — un lugar donde el tiempo se detiene en silencio y el mar susurra como si quisiera tocar tu corazón.",
    },
    {
      id: "13",
      image: "/bonaire/story-13.jpeg",
      category: "HISTORIA",
      title: "LAS SALINAS DE BONAIRE",
      description:
        "En el sur de Bonaire se encuentra un paisaje que es tan hermoso como cargado de historia. Las vastas salinas crean un mundo sereno de blanco y azul.",
    },
    {
      id: "14",
      image: "/bonaire/story-14.jpeg",
      category: "PAISAJE DE SAL",
      title: "LOS COLORES DEL SUR",
      description:
        "En el sur de Bonaire se despliega un paisaje casi irreal en su belleza. Desde el aire, la carretera parece una fina cinta entre el mar turquesa y las extensas salinas.",
    },
    {
      id: "15",
      image: "/bonaire/story-15.jpeg",
      category: "ATARDECER",
      title: "CUANDO EL CIELO TOCA EL MAR",
      description:
        "Cuando el sol se hunde bajo el horizonte, el cielo se tiñe de dorado y ámbar mientras el mar se mueve suavemente bajo la última luz del día.",
    },
    {
      id: "16",
      image: "/bonaire/story-16.jpeg",
      category: "FARO",
      title: "EL FARO WILLEMSTOREN",
      description:
        "Donde el cielo azul profundo se encuentra con la tranquila costa sur de Bonaire, el Willemstoren se alza como un elegante guardián junto al mar.",
    },
    {
      id: "17",
      image: "/bonaire/story-17.jpeg",
      category: "VISTA AL OCÉANO",
      title: "MIRANDO EL HORIZONTE",
      description:
        "A lo largo de la costa, donde la libertad se vuelve casi tangible, miras hacia el horizonte infinito.",
    },
    {
      id: "18",
      image: "/bonaire/story-18.jpeg",
      category: "BUCEO",
      title: "UN MUNDO BAJO EL AGUA",
      description:
        "Bajo la superficie de Bonaire se abre un mundo que no encontrarás en ningún otro lugar. Mientras un buceador se mueve entre los corales, toda prisa desaparece.",
    },
  ],
};

export const whyNeedCar = (locale: string) => {
  return whyNeedCarItems[locale];
};
