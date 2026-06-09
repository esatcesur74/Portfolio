import type { PortfolioData } from "@/types";

const portfolio: PortfolioData = {
  name: "Siar Esat Cesur",
  title: "Student & Entrepreneur",
  tagline: "I build things that matter.",
  bio: [
    "I'm Siar a student and entrepreneur with a passion for building products from scratch. I love turning ideas into real, working things.",
    "Whether it's a web app, a business idea, or a side project, I'm always working on something. Currently focused on sharpening my development skills and launching projects that solve real problems.",
  ],
  email: "siaresatcesur@gmail.com",
  github: "https://github.com/esatcesur74",
  linkedin: "https://www.linkedin.com/in/esat-cesur-240803390",

  projects: [
    {
      id: 1,
      title: "Liva Food — Restaurant & Catering Website",
      description: "A complete multi-page website for a Turkish-Dutch restaurant and catering brand in Eindhoven. Covers brand story, full menu, catering inquiries, and event booking. Now managing ongoing development and digital marketing.",
      tags: ["HTML", "CSS", "Web Design"],
      image: "/images/catering.jpeg",
      liveUrl: "https://www.livafood.nl/",
      color: "#FFF700",
      textColor: "#111111",
      sections: [
        {
          image: "/images/livafoodaboutus.png",
          imagePosition: "left",
          heading: "The Brand",
          body: "Liva Food is a Turkish-Dutch catering and restaurant brand based in Eindhoven, Netherlands, serving both walk-in customers and large-scale catering events including weddings, corporate gatherings, and cultural celebrations.",
        },
        {
          image: "/images/livafoodmenu.png",
          imagePosition: "right",
          heading: "The Website",
          body: "I designed and built their complete online presence from the ground up — a multi-page website covering the restaurant's story, full menu, and a dedicated catering inquiry section. The design reflects the brand's identity: warm, premium, and rooted in authentic Middle Eastern hospitality.",
        },
        {
          image: "/images/livafoodcatering.png",
          imagePosition: "left",
          heading: "The Result",
          body: "The site includes a downloadable catering menu, an event booking form that sends inquiries directly to the business, and a clean presentation of opening hours, location, and social links. It's fully responsive and hosted on Cloudflare's global network for fast, reliable performance. The business responded positively to the result, and I have since taken on an expanded role — overseeing the site's ongoing development as well as planning and managing their digital marketing campaigns.",
        },
      ],
    },
    {
      id: 2,
      title: "Floating Gallery Concept",
      description: "A personal creative experiment pushing the limits of visual web presentation. A GSAP-powered floating image gallery with smooth scroll interactions, motion-driven layouts, and original brand photography.",
      tags: ["GSAP", "JavaScript", "Animation"],
      image: "/images/floating gallery.png",
      liveUrl: "https://esatcesur74.github.io/gsap_training/",
      githubUrl: "https://github.com/esatcesur74/gsap_training",
      color: "#C084FC",
      textColor: "#111111",
      sections: [
        {
          image: "/images/floatinggalleryfirstpage.png",
          imagePosition: "left",
          heading: "The Concept",
          body: "This project is a personal creative experiment built to push the boundaries of visual presentation on the web. Designed as a floating gallery experience, it showcases original brand photography in a dynamic, motion-driven layout that goes beyond conventional grid-based portfolios.",
        },
        {
          image: "/images/floatinggalleryscrollimageffect.png",
          imagePosition: "right",
          heading: "The Build",
          body: "The build features a custom GSAP-powered floating image system, smooth scroll interactions, and carefully tuned animation timing to give each photograph room to breathe. Every visual element was intentional, with the goal of letting the imagery lead while the interface steps back to support rather than compete.",
        },
        {
          image: "/images/floatinggalleryverticalscroll.png",
          imagePosition: "left",
          heading: "The Direction",
          body: "The design direction leans minimal and kinetic, drawing the viewer's eye through the content naturally. Since the images were shot specifically for this project, the visual identity feels cohesive from the ground up, with both the photography and the interaction design crafted as a single unified experience.",
        },
        {
          image: "/images/floatingmenudesign.png",
          imagePosition: "right",
          heading: "The Takeaway",
          body: "This project served as a skills development ground for advanced GSAP techniques and creative frontend thinking. The patterns explored here now directly inform client work, particularly for brands that demand memorable, motion-rich web experiences.",
        },
      ],
    },
    {
      id: 3,
      title: "Mesta Road Data Dashboard",
      description: "Bachelor capstone project graded A. A full-stack internal dashboard for Norway's largest road maintenance company, featuring live maps, weather data, KPI charts, and operational cost tracking.",
      tags: ["React", "TypeScript", "MapLibre", "UI Design"],
      image: "/images/mestaenglishdark.png",
      badge: "Graded A — Confidential",
      color: "#93C5FD",
      textColor: "#111111",
      sections: [
        {
          image: "/images/mestaenglishdark.png",
          imagePosition: "left",
          heading: "The Platform",
          body: "Mesta is Norway's largest road maintenance company, responsible for keeping thousands of kilometres of public roads safe year-round. For our bachelor's degree capstone project, graded A by the university panel, our team built a full-stack internal web platform designed to give Mesta's operations teams a real-time overview of their winter road maintenance work.",
        },
        {
          image: "/images/mestasaltpunkt.png",
          imagePosition: "right",
          heading: "The Frontend",
          body: "The frontend, which I designed and built entirely from scratch, spans a multi-page dashboard application including an interactive operations map showing active salting routes and treatment points, a live weather heatmap sourced from the Norwegian Meteorological Institute, a KPI and statistics dashboard with dynamic chart carousels, and an economics table for tracking operational costs. The interface also supports both Norwegian and English, reflecting the company's internal needs.",
        },
        {
          image: "/images/mestaværkort.png",
          imagePosition: "left",
          heading: "The Design",
          body: "The visual direction follows a clean, data-forward aesthetic with dark tones, high-contrast data overlays, and a structured grid layout, chosen specifically to make dense operational information readable at a glance. The design avoids decorative clutter in favour of clarity and speed, which is exactly what a team monitoring live road conditions needs.",
        },
        {
          image: "/images/rapportsiden.png",
          imagePosition: "right",
          heading: "The Stack",
          body: "The project was built using React 19 with TypeScript, MapLibre GL and Leaflet for geospatial rendering, and Recharts for data visualisation, backed by a .NET 8 API and PostgreSQL. Receiving a top grade from the university panel, the project was recognised as a well-executed solution that brought Mesta's operational data together into a single, coherent interface.",
        },
      ],
    },
    {
      id: 4,
      title: "Ekip EU",
      description: "A company I have been building for three years. Responsible for content creation, marketing strategy, financial operations, and organising events with over 300 attendees.",
      tags: ["Entrepreneurship", "Marketing", "Content", "Finance"],
      image: "/images/ekip.jpeg",
      liveUrl: "https://ekipeu.com",
      color: "#6EE7B7",
      textColor: "#111111",
      sections: [
        {
          type: "hero",
          video: "/images/vid1ekip.mp4",
          heading: "The Company",
          body: "Ekip EU is a company I founded and have been building for three years. From day one, I have been responsible for every core function of the business, covering content creation, marketing strategy, and financial operations.",
        },
        {
          type: "side",
          video: "/images/vid4.mp4",
          imagePosition: "right",
          heading: "The Reach",
          body: "During active sale periods, our Instagram content reaches over 60,000 views. Every video we produce averages more than 6,000 views, with a following of 600 people. The numbers reflect an engaged, loyal audience rather than inflated metrics.",
        },
        {
          type: "side",
          image: "/images/ekipfoto2.jpeg",
          imagePosition: "left",
          heading: "The Events",
          body: "One of the highlights so far was organising an event that brought in over 300 attendees, where we sold out completely. It showed that what we are building has a real audience and genuine demand.",
        },
        {
          type: "side",
          image: "/images/ekiprichard.jpeg",
          imagePosition: "right",
          heading: "The Vision",
          body: "We are now working on international expansion. The groundwork is already laid with some reach beyond our home market, and the next phase is about turning that into something more structured and scalable.",
        },
      ],
    },
    {
      id: 5,
      title: "LUVIT — AI Personal Trainer",
      description: "A proof-of-concept AI fitness app for an early-stage startup. Full-stack mobile build with React Native and Python FastAPI, featuring AI coach personas, real-time voice interaction, and exercise video guidance.",
      tags: ["React Native", "Python", "AI", "UI Design"],
      color: "#FB923C",
      textColor: "#111111",
      sections: [
        {
          type: "side",
          image: "/images/aitrainer.png",
          imagePosition: "left",
          heading: "The Product",
          body: "LUVIT is a proof-of-concept application built for an early-stage startup exploring the intersection of artificial intelligence and personal fitness. The product aims to democratize access to personalized coaching by giving users an always-available AI trainer that adapts to their goals, pace, and preferences, without the cost or scheduling friction of a human coach.",
        },
        {
          type: "side",
          image: "/images/aitraner2.png",
          imagePosition: "right",
          heading: "The Build",
          body: "The build includes a full-stack mobile application with a React Native (Expo) frontend and a Python FastAPI backend. Users can select from distinct AI coach personas, each with a unique communication style and coaching philosophy. The app supports real-time voice and text interaction, exercise video guidance with smart matching, and persistent conversation history. The design language is clean and energetic, built to feel credible and motivating rather than clinical. This engagement covered the full proof-of-concept scope, from architecture and API design through to the user-facing experience, and serves as the foundation for the startup's investor demos and early user testing rounds.",
        },
      ],
    },
  ],

  skillGroups: [
    {
      category: "Frontend",
      skills: ["JavaScript", "TypeScript", "HTML", "CSS", "React", "React Native", "Next.js", "GSAP"],
    },
    {
      category: "Design",
      skills: ["Figma", "UI Design", "Web Design"],
    },
    {
      category: "Backend & Tools",
      skills: ["Python", "FastAPI", "PostgreSQL", "GitHub"],
    },
    {
      category: "Currently Exploring",
      skills: ["MapLibre GL", "Tailwind CSS", "Framer Motion"],
    },
  ],
};

export default portfolio;
