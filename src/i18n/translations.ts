export type LangKey = 'es' | 'en';

export interface PillarT { label: string; description: string }
export interface PracticeT { title: string; text: string }
export interface MantraT { text: string; meaning: string }
export interface ExplorePathT {
  id: string; label: string; essence: string; prose: string;
  companion: { name: string; category: string };
}
export interface ArtistT { id: string; role: string; desc: string }

export interface LangData {
  nav: { links: { to: string; label: string }[] };

  hero: {
    headline1: string; headline2: string;
    manifesto: string; subtitle: string;
    cta1: string; cta2: string;
    jumpTo: string; scroll: string;
    chips: { label: string; to: string }[];
  };

  home: {
    sectionLabel: string; sectionTitle: string;
    cards: { label: string; desc: string }[];
  };

  historia: {
    label: string; h1a: string; h1b: string; subtitle: string; manifesto: string;
    chapters: { year: string; title: string; text: string }[];
    img0: { label: string; caption: string };
    img1: { label: string; caption: string };
    closing: string; cta1: string; cta2: string;
  };

  enneagram: {
    label: string; h2: string; p1: string; p2: string;
    pillars: PillarT[];
    noSelection: string; pillar: string; of: string;
    prose1: string; prose2: string;
    cta1: string; cta2: string; cta3: string;
  };

  consciousness: {
    label: string; h2: string; quote: string;
    bodyEm: string; body2: string; body3: string;
    tags: string[];
    practices: PracticeT[];
    mantrasLabel: string; mantras: MantraT[];
  };

  manifesto: {
    p1: string; p2: string; quote: string; p3: string; p4: string; p5: string;
  };

  explore: {
    label: string; h2: string; p: string;
    door: string; ofTotal: string; companion: string; cta: string;
    paths: ExplorePathT[];
  };

  artists: {
    label: string; h2: string; p: string;
    list: ArtistT[];
    listen: string; comingSoon: string; soundsDesc: string;
  };

  products: {
    label: string; h2: string; p: string;
    filters: { key: string; label: string }[];
    buy: string; processing: string; paymentLabel: string; errorMsg: string;
    badge1: { title: string; p: string };
    badge2: { title: string; p: string };
    badge3: { title: string; p: string };
    categories: Record<string, string>;
  };

  about: {
    label: string; h2: string;
    h3: string; p1: string; p2: string; p3: string;
    pillars: { title: string; text: string }[];
  };

  cta: { line1: string; line1b: string; line2: string; button: string };

  contact: {
    label: string; h2: string; p: string;
    socials: { name: string; handle: string }[];
    formTitle: string; emailPlaceholder: string;
    messagePlaceholder: string; submit: string; sent: string;
  };

  footer: {
    manifesto: string;
    navLinks: { inicio: string; productos: string; artistas: string; conciencia: string; nosotros: string; contacto: string };
    language: string; es: string; en: string;
    rights: string; terms: string; privacy: string;
  };
}

export const translations: Record<LangKey, LangData> = {
  es: {
    nav: {
      links: [
        { to: '/historia',  label: 'Historia'   },
        { to: '/eneagrama', label: 'Eneagrama'  },
        { to: '/sentir',    label: 'Sentir'      },
        { to: '/explorar',  label: 'Explorar'    },
        { to: '/sonido',    label: 'Sonido'      },
        { to: '/rituales',  label: 'Rituales'    },
        { to: '/nosotros',  label: 'Nosotros'    },
        { to: '/contacto',  label: 'Contacto'    },
      ],
    },

    hero: {
      headline1: 'El lujo no se consume.',
      headline2: 'Se experimenta.',
      manifesto: '"Somos sombra con propósito y luz que nunca se olvida."',
      subtitle: 'Un portal entre el arte, el sonido y la presencia.',
      cta1: 'Vivir la experiencia',
      cta2: 'Comprar mercancía',
      jumpTo: 'Saltar a',
      scroll: 'Scroll',
      chips: [
        { label: 'Historia',   to: '/historia'   },
        { label: 'Eneagrama',  to: '/eneagrama'  },
        { label: 'Sentir',     to: '/sentir'      },
        { label: 'Sonido',     to: '/sonido'      },
      ],
    },

    home: {
      sectionLabel: 'El portal',
      sectionTitle: 'Elige por dónde entrar',
      cards: [
        { label: 'Historia',   desc: 'El origen de la marca, contado en su propia voz.'               },
        { label: 'Eneagrama',  desc: 'Nueve pilares que configuran la experiencia.'                    },
        { label: 'Sentir',     desc: 'Prácticas para habitar el presente.'                             },
        { label: 'Explorar',   desc: 'Espacios y estados para descubrir.'                              },
        { label: 'Sonido',     desc: 'Artistas y frecuencias que acompañan el ritual.'                 },
        { label: 'Rituales',   desc: 'La mercancía, pensada como pieza de colección.'                  },
      ],
    },

    historia: {
      label: 'La historia',
      h1a: 'Antes del humo,',
      h1b: 'existió la pregunta.',
      subtitle: 'Una marca no es un logo. Es una manera de mirar el mundo. Esta es la nuestra.',
      manifesto: '"Somos sombra con propósito y luz que nunca se olvida."',
      chapters: [
        {
          year: 'Capítulo I',
          title: 'El silencio antes del humo',
          text: 'SMOKETHECAVIAR nace de una pregunta incómoda: ¿qué queda del lujo cuando se le quita la apariencia? La respuesta que encontramos no se mostraba — se respiraba. Una pausa, un instante, una decisión consciente.',
        },
        {
          year: 'Capítulo II',
          title: 'Sombra con propósito',
          text: 'Aceptamos la oscuridad como material de trabajo. No la negamos: la usamos. Cada pieza, cada sonido y cada ritual fueron diseñados para acompañar a quienes saben que la luz solo cobra sentido cuando reconoce su sombra.',
        },
        {
          year: 'Capítulo III',
          title: 'Luz que nunca se olvida',
          text: 'Lo que dejamos en quien nos elige no es un producto: es una marca interior. Un recuerdo sensorial. Por eso curamos cada textura, cada nota y cada palabra como si fueran una sola cosa — porque lo son.',
        },
      ],
      img0: { label: 'Origen',   caption: 'Nacer es elegir despertar.'           },
      img1: { label: 'Presente', caption: 'Lo exclusivo no se exhibe — se vive.' },
      closing: 'La historia continúa cuando alguien la habita.',
      cta1: 'Conocer el Eneagrama',
      cta2: 'Ver los rituales',
    },

    enneagram: {
      label: 'Geometría Sagrada',
      h2: 'El Eneagrama Dorado',
      p1: 'No es un logo. Es un portal de memoria, vibración y evolución.',
      p2: 'Toca un pilar para revelar su frecuencia.',
      pillars: [
        { label: 'Cuerpo',        description: 'El templo físico. Donde el ritual comienza y la transformación se ancla.' },
        { label: 'Mente',         description: 'Claridad sin ruido. El pensamiento elevado que precede toda creación.' },
        { label: 'Espíritu',      description: 'La chispa invisible que conecta todo. Presencia pura, sin forma.' },
        { label: 'Luz',           description: 'La frecuencia que ilumina lo que merece ser visto. Brilla sin pedir permiso.' },
        { label: 'Sombra',        description: 'Lo que no se ve también es sagrado. La sombra es donde nace la profundidad.' },
        { label: 'Unión',         description: 'El hilo dorado entre almas que vibran en la misma frecuencia.' },
        { label: 'Propósito',     description: 'La razón silenciosa que sostiene cada paso. Brújula del alma.' },
        { label: 'Creación',      description: 'El acto de dar forma a lo invisible. Cada gesto es una obra.' },
        { label: 'Trascendencia', description: 'Cruzar el umbral. Lo que queda cuando todo lo demás se disuelve.' },
      ],
      noSelection: 'Toca un punto del eneagrama para revelar su significado.',
      pillar: 'Pilar', of: 'de',
      prose1: 'Nueve puntos. Un solo movimiento.',
      prose2: 'El que conecta lo que eres con lo que puedes llegar a ser.',
      cta1: 'Sentir el ritual', cta2: 'Elegir tu puerta', cta3: 'Comprar mercancía',
    },

    consciousness: {
      label: 'Ritual interior',
      h2: 'Expande tu Conciencia',
      quote: '"El universo no está afuera. Tu cuerpo es el templo y la meditación es la llave."',
      bodyEm: 'recordar',
      body2: 'En un mundo de ruido permanente, la verdadera disrupción es el silencio. Cada respiración consciente es una revolución íntima, un regreso al centro que nunca se fue.',
      body3: 'El yoga no es estiramiento: es unión. La meditación no es ausencia: es presencia absoluta. Nuestros rituales acompañan el descenso hacia ese estado primordial donde cuerpo y espíritu comparten la misma frecuencia.',
      tags: ['Yoga', 'Meditación', 'Ritual'],
      practices: [
        { title: 'Pranayama',          text: 'Respiración consciente. La puerta entre el cuerpo y el espíritu — inhala luz, exhala densidad.' },
        { title: 'Meditación Nocturna', text: 'Silencio activo bajo la luna. El reino donde los pensamientos se disuelven y nace la intuición.' },
        { title: 'Ritual del Fuego',   text: 'Enciende una vela. Sostén la mirada. Lo que arde afuera también arde adentro.' },
        { title: 'Tercer Ojo',         text: 'Activa el ajna chakra. La visión interior es el lujo más antiguo y el más olvidado.' },
        { title: 'Kundalini',          text: 'Despierta la energía dormida en la base de tu espina. El ascenso es un acto sagrado.' },
        { title: 'Anahata',            text: 'El chakra del corazón como residencia del amor universal. Meditar aquí es recordar quién eres.' },
      ],
      mantrasLabel: 'Mantras sagrados',
      mantras: [
        { text: 'Om Namah Shivaya', meaning: 'Me inclino ante mi propia divinidad' },
        { text: 'So Hum',           meaning: 'Yo soy eso'                          },
        { text: 'Sat Nam',          meaning: 'La verdad es mi identidad'           },
      ],
    },

    manifesto: {
      p1: 'Durante años, el lujo fue apariencia.',
      p2: 'Hoy, el lujo es cómo te sientes.',
      quote: 'Somos sombra con propósito y luz que nunca se olvida.',
      p3: 'Es exclusivo.',
      p4: 'No vendemos productos.',
      p5: 'Creamos rituales.',
    },

    explore: {
      label: 'Exploración',
      h2: 'Elegí tu puerta de entrada',
      p: 'Cinco caminos, un mismo centro. Cada puerta revela una forma distinta de habitar el momento. Seguí la que te llame.',
      door: 'Puerta', ofTotal: 'de', companion: 'Acompañante del camino', cta: 'Conocer la prenda',
      paths: [
        { id: 'quietud',   label: 'Quietud',   essence: 'Detener. Respirar. Habitar el silencio.',   prose: 'El primer lujo es el silencio. Un espacio donde el cuerpo se desarma, la mente se suaviza y la noche vuelve a ser templo. No se busca dormir: se busca volver.', companion: { name: 'Caviar Crewneck', category: 'Sudadera Sin Capucha' } },
        { id: 'energia',   label: 'Energía',   essence: 'Despertar lo que duerme.',                  prose: 'Hay una chispa que el cuerpo recuerda antes de pensar. Moverse, encenderse, soltar. La energía no se toma: se libera. Y cuando fluye, todo lo demás se ordena solo.', companion: { name: 'Smoke Snapback', category: 'Gorra Snapback' } },
        { id: 'aroma',     label: 'Aroma',     essence: 'El espacio también vibra.',                 prose: 'Lo que se huele se siente dos veces. El humo, la madera, la resina: memorias sin palabras. Un aroma bien elegido convierte una habitación en un altar, y un momento en un rito.', companion: { name: 'Noir Tote Bag', category: 'Tote Minimalista' } },
        { id: 'ritual',    label: 'Ritual',    essence: 'El gesto que vuelve sagrado lo cotidiano.', prose: 'Aplicar, respirar, esperar. El ritual no está en el objeto — está en la repetición consciente. Cuando lo cotidiano se vuelve ceremonia, la piel, el aire y la intención se alinean.', companion: { name: 'Ritual Hoodie', category: 'Sudadera Premium' } },
        { id: 'presencia', label: 'Presencia', essence: 'Estar. Completamente.',                     prose: 'El estado más raro. Ni recordando, ni anticipando: acá. La presencia no se fuerza, se permite. Y cuando ocurre, no necesita nada más — eso es, justamente, el lujo.', companion: { name: 'Caviar Tee Black', category: 'Playera Oversize' } },
      ],
    },

    artists: {
      label: 'Digital Gods',
      h2: 'Musa Generativa',
      p: 'Arte y sonido creados 100% con inteligencia artificial. Una nueva era donde el lujo también se escucha.',
      list: [
        { id: 'bruno', role: 'Audio Alchemist', desc: 'Sonidos esculpidos algorítmicamente para acompañar tus rituales.' },
        { id: 'lucy',  role: 'Sonic Architect', desc: 'Sonidos esculpidos algorítmicamente para acompañar tus rituales.' },
      ],
      listen: 'Escuchar en Spotify', comingSoon: 'Próximamente...',
      soundsDesc: 'Sonidos esculpidos algorítmicamente para acompañar tus rituales.',
    },

    products: {
      label: 'Mercancía',
      h2: 'Vestir el Manifiesto',
      p: 'Prendas de culto. El símbolo dorado tejido en la piel cotidiana.',
      filters: [
        { key: 'all',     label: 'Todo'        },
        { key: 'tee',     label: 'Playeras'    },
        { key: 'hoodie',  label: 'Sudaderas'   },
        { key: 'cap',     label: 'Gorras'      },
        { key: 'access',  label: 'Accesorios'  },
      ],
      buy: 'Adquirir', processing: 'Procesando', paymentLabel: 'Pagos seguros vía Mercado Pago',
      errorMsg: 'Hubo un error al iniciar el pago. Intenta de nuevo.',
      badge1: { title: 'Edición limitada',  p: 'Cada pieza, una declaración.'         },
      badge2: { title: 'Diseño autoral',    p: 'Firma propia. Símbolo intransferible.' },
      badge3: { title: 'Ritual + Estilo',   p: 'La marca como segunda piel.'           },
      categories: {
        'Playera Oversize':          'Playera Oversize',
        'Sudadera Premium':          'Sudadera Premium',
        'Gorra Bordada':             'Gorra Bordada',
        'Gorra Snapback':            'Gorra Snapback',
        'Sudadera Sin Capucha':      'Sudadera Sin Capucha',
        'Playera Edición Artista':   'Playera Edición Artista',
        'Tote Minimalista':          'Tote Minimalista',
        'Beanie Invierno':           'Beanie Invierno',
      },
    },

    about: {
      label: 'Nuestra Esencia',
      h2: 'Sobre Nosotros',
      h3: 'Nacimos para redefinir el lujo.',
      p1: 'SMOKETHECAVIAR no es una marca: es un manifiesto. Una declaración de que el verdadero estatus no se muestra — se siente.',
      p2: 'Fusionamos diseño contemporáneo, sonido generativo y geometría sagrada para crear piezas dirigidas a quienes entienden que la opulencia moderna se mide en calma, presencia y claridad mental.',
      p3: 'Cada prenda, cada textura, cada sonido de nuestros artistas fue pensado para acompañar una vida donde lo exclusivo ya no es lo que tienes — sino lo que eres.',
      pillars: [
        { title: 'Exclusividad', text: 'No fabricamos en masa. Cada pieza es una edición limitada para coleccionistas del bienestar.' },
        { title: 'Autenticidad', text: 'Diseño autoral, materiales nobles y trazabilidad total. Sin atajos, sin imitaciones.' },
        { title: 'Ritual',       text: 'No vendemos productos: diseñamos experiencias que transforman tu relación con el momento.' },
      ],
    },

    cta: {
      line1: '"Si lo necesitas,',
      line1b: 'no es para ti.',
      line2: 'Si lo entiendes, ya estás dentro."',
      button: 'Habitar el portal',
    },

    contact: {
      label: 'Conéctate',
      h2: 'Contacto',
      p: 'Escríbenos, síguenos, o únete al ritual. Las puertas del círculo están abiertas.',
      socials: [
        { name: 'Instagram', handle: '@creador_records' },
        { name: 'Facebook',  handle: 'Próximamente'     },
        { name: 'YouTube',   handle: 'Próximamente'     },
      ],
      formTitle: 'Escríbenos directamente',
      emailPlaceholder: 'Tu email',
      messagePlaceholder: 'Tu mensaje',
      submit: 'Enviar mensaje',
      sent: 'Enviado — Gracias',
    },

    footer: {
      manifesto: '"Somos sombra con propósito y luz que nunca se olvida."',
      navLinks: { inicio: 'Inicio', productos: 'Mercancía', artistas: 'Artistas', conciencia: 'Sentir', nosotros: 'Nosotros', contacto: 'Contacto' },
      language: 'Idioma', es: 'Español', en: 'Inglés',
      rights: 'Todos los derechos reservados.', terms: 'Términos', privacy: 'Privacidad',
    },
  },

  // ─────────────────────── ENGLISH ───────────────────────
  en: {
    nav: {
      links: [
        { to: '/historia',  label: 'Story'    },
        { to: '/eneagrama', label: 'Enneagram' },
        { to: '/sentir',    label: 'Feel'      },
        { to: '/explorar',  label: 'Explore'   },
        { to: '/sonido',    label: 'Sound'     },
        { to: '/rituales',  label: 'Rituals'   },
        { to: '/nosotros',  label: 'About'     },
        { to: '/contacto',  label: 'Contact'   },
      ],
    },

    hero: {
      headline1: 'Luxury is not consumed.',
      headline2: 'It is experienced.',
      manifesto: '"We are shadow with purpose and light that is never forgotten."',
      subtitle: 'A portal between art, sound, and presence.',
      cta1: 'Live the experience',
      cta2: 'Shop merch',
      jumpTo: 'Jump to',
      scroll: 'Scroll',
      chips: [
        { label: 'Story',      to: '/historia'   },
        { label: 'Enneagram',  to: '/eneagrama'  },
        { label: 'Feel',       to: '/sentir'      },
        { label: 'Sound',      to: '/sonido'      },
      ],
    },

    home: {
      sectionLabel: 'The portal',
      sectionTitle: 'Choose your entry point',
      cards: [
        { label: 'Story',      desc: 'The origin of the brand, told in its own voice.'           },
        { label: 'Enneagram',  desc: 'Nine pillars that shape the experience.'                   },
        { label: 'Feel',       desc: 'Practices for inhabiting the present.'                     },
        { label: 'Explore',    desc: 'Spaces and states to discover.'                            },
        { label: 'Sound',      desc: 'Artists and frequencies that accompany the ritual.'        },
        { label: 'Rituals',    desc: 'The merch, designed as a collector\'s piece.'              },
      ],
    },

    historia: {
      label: 'The story',
      h1a: 'Before the smoke,',
      h1b: 'there was a question.',
      subtitle: 'A brand is not a logo. It is a way of seeing the world. This is ours.',
      manifesto: '"We are shadow with purpose and light that is never forgotten."',
      chapters: [
        {
          year: 'Chapter I',
          title: 'The silence before the smoke',
          text: 'SMOKETHECAVIAR was born from an uncomfortable question: what remains of luxury once appearance is stripped away? The answer we found wasn\'t shown — it was breathed. A pause, an instant, a conscious choice.',
        },
        {
          year: 'Chapter II',
          title: 'Shadow with purpose',
          text: 'We accepted darkness as raw material. We don\'t deny it: we use it. Every piece, every sound, every ritual was designed to accompany those who know that light only makes sense when it acknowledges its shadow.',
        },
        {
          year: 'Chapter III',
          title: 'Light that is never forgotten',
          text: 'What we leave in those who choose us is not a product: it is an inner mark. A sensory memory. That\'s why we curate every texture, every note, and every word as if they were one — because they are.',
        },
      ],
      img0: { label: 'Origin',  caption: 'To be born is to choose to awaken.'            },
      img1: { label: 'Present', caption: 'The exclusive is not displayed — it is lived.'  },
      closing: 'The story continues when someone inhabits it.',
      cta1: 'Discover the Enneagram',
      cta2: 'See the rituals',
    },

    enneagram: {
      label: 'Sacred Geometry',
      h2: 'The Golden Enneagram',
      p1: 'Not a logo. A portal of memory, vibration, and evolution.',
      p2: 'Touch a pillar to reveal its frequency.',
      pillars: [
        { label: 'Body',          description: 'The physical temple. Where ritual begins and transformation is anchored.' },
        { label: 'Mind',          description: 'Clarity without noise. The elevated thought that precedes all creation.' },
        { label: 'Spirit',        description: 'The invisible spark that connects everything. Pure presence, formless.' },
        { label: 'Light',         description: 'The frequency that illuminates what deserves to be seen. It shines without asking permission.' },
        { label: 'Shadow',        description: 'What is unseen is also sacred. Shadow is where depth is born.' },
        { label: 'Union',         description: 'The golden thread between souls vibrating on the same frequency.' },
        { label: 'Purpose',       description: 'The silent reason that sustains every step. Compass of the soul.' },
        { label: 'Creation',      description: 'The act of giving form to the invisible. Every gesture is a work of art.' },
        { label: 'Transcendence', description: 'Crossing the threshold. What remains when everything else dissolves.' },
      ],
      noSelection: 'Touch a point on the enneagram to reveal its meaning.',
      pillar: 'Pillar', of: 'of',
      prose1: 'Nine points. One single movement.',
      prose2: 'The one that connects who you are with who you can become.',
      cta1: 'Feel the ritual', cta2: 'Choose your door', cta3: 'Shop merch',
    },

    consciousness: {
      label: 'Inner ritual',
      h2: 'Expand your Consciousness',
      quote: '"The universe is not outside. Your body is the temple and meditation is the key."',
      bodyEm: 'remember',
      body2: 'In a world of permanent noise, true disruption is silence. Every conscious breath is an intimate revolution, a return to the center that never left.',
      body3: 'Yoga is not stretching: it is union. Meditation is not absence: it is absolute presence. Our rituals accompany the descent into that primordial state where body and spirit share the same frequency.',
      tags: ['Yoga', 'Meditation', 'Ritual'],
      practices: [
        { title: 'Pranayama',       text: 'Conscious breathing. The gateway between body and spirit — inhale light, exhale density.' },
        { title: 'Night Meditation', text: 'Active silence under the moon. The realm where thoughts dissolve and intuition is born.' },
        { title: 'Fire Ritual',     text: 'Light a candle. Hold your gaze. What burns outside also burns within.' },
        { title: 'Third Eye',       text: 'Activate the ajna chakra. Inner vision is the oldest luxury and the most forgotten.' },
        { title: 'Kundalini',       text: 'Awaken the dormant energy at the base of your spine. The ascent is a sacred act.' },
        { title: 'Anahata',         text: 'The heart chakra as the residence of universal love. To meditate here is to remember who you are.' },
      ],
      mantrasLabel: 'Sacred mantras',
      mantras: [
        { text: 'Om Namah Shivaya', meaning: 'I bow to my own divinity'   },
        { text: 'So Hum',           meaning: 'I am that'                  },
        { text: 'Sat Nam',          meaning: 'Truth is my identity'       },
      ],
    },

    manifesto: {
      p1: 'For years, luxury was appearance.',
      p2: 'Today, luxury is how you feel.',
      quote: 'We are shadow with purpose and light that is never forgotten.',
      p3: 'It is exclusive.',
      p4: 'We don\'t sell products.',
      p5: 'We create rituals.',
    },

    explore: {
      label: 'Exploration',
      h2: 'Choose your entry door',
      p: 'Five paths, one center. Each door reveals a different way of inhabiting the moment. Follow the one that calls you.',
      door: 'Door', ofTotal: 'of', companion: 'Path companion', cta: 'Discover the piece',
      paths: [
        { id: 'quietud',   label: 'Stillness',  essence: 'Stop. Breathe. Inhabit the silence.',        prose: 'The first luxury is silence. A space where the body disarms, the mind softens, and night becomes a temple again. Not seeking sleep: seeking return.', companion: { name: 'Caviar Crewneck', category: 'Crewneck Sweatshirt' } },
        { id: 'energia',   label: 'Energy',     essence: 'Awaken what sleeps.',                        prose: 'There is a spark the body remembers before thought. Move, ignite, release. Energy is not taken: it is freed. And when it flows, everything else falls into place.', companion: { name: 'Smoke Snapback', category: 'Snapback Cap' } },
        { id: 'aroma',     label: 'Aroma',      essence: 'Space also vibrates.',                       prose: 'What is smelled is felt twice. Smoke, wood, resin: memories without words. A well-chosen scent turns a room into an altar, and a moment into a rite.', companion: { name: 'Noir Tote Bag', category: 'Minimalist Tote' } },
        { id: 'ritual',    label: 'Ritual',     essence: 'The gesture that makes the everyday sacred.', prose: 'Apply, breathe, wait. The ritual is not in the object — it is in conscious repetition. When the everyday becomes ceremony, skin, air, and intention align.', companion: { name: 'Ritual Hoodie', category: 'Premium Hoodie' } },
        { id: 'presencia', label: 'Presence',   essence: 'Be. Completely.',                            prose: 'The rarest state. Neither remembering nor anticipating: here. Presence is not forced, it is allowed. And when it happens, it needs nothing more — that, precisely, is luxury.', companion: { name: 'Caviar Tee Black', category: 'Oversize Tee' } },
      ],
    },

    artists: {
      label: 'Digital Gods',
      h2: 'Generative Muse',
      p: 'Art and sound created 100% with artificial intelligence. A new era where luxury is also heard.',
      list: [
        { id: 'bruno', role: 'Audio Alchemist', desc: 'Algorithmically sculpted sounds to accompany your rituals.' },
        { id: 'lucy',  role: 'Sonic Architect', desc: 'Algorithmically sculpted sounds to accompany your rituals.' },
      ],
      listen: 'Listen on Spotify', comingSoon: 'Coming soon...',
      soundsDesc: 'Algorithmically sculpted sounds to accompany your rituals.',
    },

    products: {
      label: 'Merch',
      h2: 'Wear the Manifesto',
      p: 'Cult pieces. The golden symbol woven into everyday skin.',
      filters: [
        { key: 'all',    label: 'All'         },
        { key: 'tee',    label: 'Tees'        },
        { key: 'hoodie', label: 'Hoodies'     },
        { key: 'cap',    label: 'Caps'        },
        { key: 'access', label: 'Accessories' },
      ],
      buy: 'Acquire', processing: 'Processing', paymentLabel: 'Secure payments via Mercado Pago',
      errorMsg: 'There was an error starting the payment. Please try again.',
      badge1: { title: 'Limited edition', p: 'Every piece, a declaration.'         },
      badge2: { title: 'Original design', p: 'Own signature. Untransferable symbol.' },
      badge3: { title: 'Ritual + Style',  p: 'The brand as a second skin.'           },
      categories: {
        'Playera Oversize':         'Oversize Tee',
        'Sudadera Premium':         'Premium Hoodie',
        'Gorra Bordada':            'Embroidered Cap',
        'Gorra Snapback':           'Snapback Cap',
        'Sudadera Sin Capucha':     'Crewneck Sweatshirt',
        'Playera Edición Artista':  'Artist Edition Tee',
        'Tote Minimalista':         'Minimalist Tote',
        'Beanie Invierno':          'Winter Beanie',
      },
    },

    about: {
      label: 'Our Essence',
      h2: 'About Us',
      h3: 'We were born to redefine luxury.',
      p1: 'SMOKETHECAVIAR is not a brand: it is a manifesto. A declaration that true status is not shown — it is felt.',
      p2: 'We merge contemporary design, generative sound, and sacred geometry to create pieces aimed at those who understand that modern opulence is measured in calm, presence, and mental clarity.',
      p3: 'Every garment, every texture, every sound from our artists was conceived to accompany a life where the exclusive is no longer what you have — but what you are.',
      pillars: [
        { title: 'Exclusivity',  text: 'We don\'t mass produce. Each piece is a limited edition for wellness collectors.' },
        { title: 'Authenticity', text: 'Original design, noble materials, and full traceability. No shortcuts, no imitations.' },
        { title: 'Ritual',       text: 'We don\'t sell products: we design experiences that transform your relationship with the moment.' },
      ],
    },

    cta: {
      line1: '"If you need it,',
      line1b: 'it\'s not for you.',
      line2: 'If you understand it, you\'re already in."',
      button: 'Inhabit the portal',
    },

    contact: {
      label: 'Connect',
      h2: 'Contact',
      p: 'Write to us, follow us, or join the ritual. The doors of the circle are open.',
      socials: [
        { name: 'Instagram', handle: '@creador_records' },
        { name: 'Facebook',  handle: 'Coming soon'      },
        { name: 'YouTube',   handle: 'Coming soon'      },
      ],
      formTitle: 'Write to us directly',
      emailPlaceholder: 'Your email',
      messagePlaceholder: 'Your message',
      submit: 'Send message',
      sent: 'Sent — Thank you',
    },

    footer: {
      manifesto: '"We are shadow with purpose and light that is never forgotten."',
      navLinks: { inicio: 'Home', productos: 'Merch', artistas: 'Artists', conciencia: 'Feel', nosotros: 'About', contacto: 'Contact' },
      language: 'Language', es: 'Spanish', en: 'English',
      rights: 'All rights reserved.', terms: 'Terms', privacy: 'Privacy',
    },
  },
};
