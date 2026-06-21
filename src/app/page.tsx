import Landing from "@/components/Landing";
import Sections from "@/components/Sections";

export default function Home() {
  return (
    <main style={{ background: "var(--surface-canvas)" }}>
      {/* Hero snap target — creates the 100vh space so sections start below */}
      <div style={{ height: "100vh", flexShrink: 0 }} />
      <Landing />
      <Sections />
    </main>
  );
}
