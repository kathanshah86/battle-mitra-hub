
import { useRef, useEffect } from "react";

const SponsorsSection = () => {
  const sponsorsRef = useRef<HTMLDivElement>(null);

  // Simple animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sponsors = sponsorsRef.current?.querySelectorAll('.sponsor-card');
    sponsors?.forEach((sponsor) => {
      observer.observe(sponsor);
    });

    return () => {
      sponsors?.forEach((sponsor) => {
        observer.unobserve(sponsor);
      });
    };
  }, []);

  return (
    <section className="py-20 bg-esports-darker">
      <div className="container mx-auto px-4" ref={sponsorsRef}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron bg-gradient-to-r from-esports-purple to-esports-blue bg-clip-text text-transparent inline-block mb-2">
            Our Sponsors
          </h2>
          <div className="w-48 h-1 bg-gradient-to-r from-esports-purple to-esports-blue mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Partnering with the biggest brands to bring you the best tournaments.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* ROG */}
          <div className="sponsor-card bg-esports-card border border-gray-800 hover:border-red-500/50 transition-all duration-300 p-6 rounded-lg flex items-center justify-center h-32 opacity-0 translate-y-10 transition-all duration-500">
            <p className="text-red-500 font-bold text-lg font-orbitron text-center">ROG Republic of Gamers</p>
          </div>
          
          {/* Razer */}
          <div className="sponsor-card bg-esports-card border border-gray-800 hover:border-green-500/50 transition-all duration-300 p-6 rounded-lg flex items-center justify-center h-32 opacity-0 translate-y-10 transition-all duration-500 delay-100">
            <p className="text-green-500 font-bold text-xl font-orbitron text-center">Razer</p>
          </div>
          
          {/* HyperX */}
          <div className="sponsor-card bg-esports-card border border-gray-800 hover:border-red-400/50 transition-all duration-300 p-6 rounded-lg flex items-center justify-center h-32 opacity-0 translate-y-10 transition-all duration-500 delay-200">
            <p className="text-red-400 font-bold text-xl font-orbitron text-center">HyperX</p>
          </div>
          
          {/* MSI */}
          <div className="sponsor-card bg-esports-card border border-gray-800 hover:border-red-600/50 transition-all duration-300 p-6 rounded-lg flex items-center justify-center h-32 opacity-0 translate-y-10 transition-all duration-500 delay-300">
            <p className="text-red-600 font-bold text-xl font-orbitron text-center">MSI</p>
          </div>
          
          {/* Logitech G */}
          <div className="sponsor-card bg-esports-card border border-gray-800 hover:border-blue-500/50 transition-all duration-300 p-6 rounded-lg flex items-center justify-center h-32 opacity-0 translate-y-10 transition-all duration-500 delay-400">
            <p className="text-blue-500 font-bold text-xl font-orbitron text-center">Logitech G</p>
          </div>
          
          {/* SteelSeries */}
          <div className="sponsor-card bg-esports-card border border-gray-800 hover:border-orange-500/50 transition-all duration-300 p-6 rounded-lg flex items-center justify-center h-32 opacity-0 translate-y-10 transition-all duration-500 delay-500">
            <p className="text-orange-500 font-bold text-xl font-orbitron text-center">SteelSeries</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Interested in sponsoring our tournaments? 
            <a href="/contact" className="text-esports-purple ml-1 hover:text-esports-purple/80 transition-colors">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
