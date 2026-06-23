export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* grid texture */}
      <div className="grid-texture absolute inset-0 opacity-70" />
      {/* amber glow orbs */}
      <div className="glow-orb animate-glow-pan absolute -left-32 -top-40 h-[42rem] w-[42rem]" />
      <div
        className="glow-orb absolute -right-40 top-1/3 h-[34rem] w-[34rem]"
        style={{ animationDelay: '-6s' }}
      />
      {/* top + bottom vignette to anchor content */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />
    </div>
  );
}
