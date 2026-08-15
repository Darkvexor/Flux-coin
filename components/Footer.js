export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-lg flex items-center justify-center">
              <span className="text-white font-black">F</span>
            </div>
            <span className="text-xl font-black font-grotesk text-white">FLUX</span>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Flux. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built to surpass Bitcoin. The future of digital currency.
          </p>
        </div>
      </div>
    </footer>
  );
}