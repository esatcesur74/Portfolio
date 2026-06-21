export default function Navbar() {
  return (
    <div className="px-6 md:px-12 lg:px-16 pt-6">
      <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <span className="text-2xl font-semibold tracking-tight">VEX</span>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-8">
          {["Story", "Investing", "Building", "Advisory"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-white hover:text-gray-300 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
          Start a Chat
        </button>
      </nav>
    </div>
  );
}
