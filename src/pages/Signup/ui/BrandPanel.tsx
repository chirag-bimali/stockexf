import logo from "../../../assets/logo.png";

export function BrandPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="hidden h-full lg:flex lg:col-span-5 relative flex-col justify-between p-10 xl:p-14 bg-gray-900 text-white overflow-hidden select-none">
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(rgb(70, 95, 255) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-600/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-36 -right-24 w-[480px] h-[480px] rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

      {/* Brand */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md p-1">
          <img
            src={logo}
            alt="Stockex logo"
            className="w-8 h-8 object-contain rounded-md"
          />
        </div>
        <span className="text-base font-semibold tracking-tight">Stockex</span>
        <span className="whitespace-nowrap inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-brand-300 bg-brand-500/15 border border-brand-500/30 rounded-full">
          Exchange
        </span>
      </div>

      {/* Lede */}
      <div className="relative z-10 my-auto py-10 max-w-lg">
        <h1 className="mb-4 text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight tracking-tight">
          {title}
        </h1>
        <p className="max-w-md text-base leading-relaxed text-gray-400">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-6 text-xs text-gray-500">
        © 2025 Stockex Global Technologies Inc.
      </div>
    </div>
  );
}
