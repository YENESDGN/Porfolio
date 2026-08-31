// tailwind.config.ts — theme bölümü

const theme = {
  // DİKKAT: extend içinde DEĞİL, doğrudan theme altında.
  // Böylece font-bold ve font-semibold sınıfları hiç var olmaz.
  fontWeight: {
    thin: "100",
    light: "300",
    normal: "400",
  },

  extend: {
    colors: {
      page: "#FFFCFF",
      surface: {
        DEFAULT: "#F6F7EB",
        media: "#D1F5FF",
      },
      ink: {
        DEFAULT: "#353535",
        secondary: "#5C5C58",
        muted: "#75756F",
        inverse: "#FFFCFF",
      },
      line: {
        DEFAULT: "#E4E4DC",
        strong: "#CFCFC5",
      },
      raspberry: {
        50: "#FBEAEC",
        500: "#DE3C4B",
        600: "#C0303F",
        700: "#A82836",
      },
    },

    fontFamily: {
      serif: ["var(--font-plex-serif)", "Georgia", "serif"],
    },

    // Kalın ağırlık olmadığı için kademeler arası fark normalden büyük.
    // Büyük boyutlar clamp ile mobilde kendiliğinden daralır.
    fontSize: {
      caption: ["0.8125rem", { lineHeight: "1.5" }],
      small: ["0.875rem", { lineHeight: "1.6" }],
      body: ["1rem", { lineHeight: "1.7" }],
      lead: ["1.125rem", { lineHeight: "1.75" }],
      h3: ["1.375rem", { lineHeight: "1.4" }],
      h2: ["clamp(1.5rem, 1.2rem + 1.4vw, 1.875rem)", { lineHeight: "1.3" }],
      h1: [
        "clamp(2rem, 1.4rem + 2.8vw, 2.5rem)",
        { lineHeight: "1.2", letterSpacing: "-0.01em" },
      ],
      display: [
        "clamp(2.5rem, 1.6rem + 4.2vw, 3.5rem)",
        { lineHeight: "1.1", letterSpacing: "-0.02em" },
      ],
    },

    spacing: {
      overlap: "3rem",
      "overlap-lg": "4.5rem",
      section: "clamp(4rem, 2rem + 7vw, 7rem)",
    },

    maxWidth: {
      prose: "62ch",
    },
  },
};

export default theme;