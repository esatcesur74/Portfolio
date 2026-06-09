"use client";

export default function DarkBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{ position: "relative", background: "#0d0d0d", overflow: "hidden" }}>

      {/* SVG noise filter — inline, invisible */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
      </svg>

      {/* Radial glow — ortada yumuşak ışık */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(90,90,90,0.45) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 30% 70%, rgba(60,60,60,0.2) 0%, transparent 60%),
          radial-gradient(ellipse 40% 30% at 75% 25%, rgba(50,50,50,0.15) 0%, transparent 60%)
        `,
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Grain overlay */}
      <div style={{
        position: "absolute",
        inset: "-50%",
        width: "200%",
        height: "200%",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
        opacity: 0.06,
        pointerEvents: "none",
        zIndex: 2,
        mixBlendMode: "overlay",
      }} />

      {/* İçerik */}
      <div style={{ position: "relative", zIndex: 3 }}>
        {children}
      </div>
    </div>
  );
}
