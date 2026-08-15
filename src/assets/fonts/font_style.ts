export const FONT_STYLES = {
  // Display
  display:
    "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",

  // Headings
  h1:
    "text-2xl md:text-3xl lg:text-4xl font-bold leading-tight",

  h2:
    "text-xl md:text-2xl lg:text-3xl font-semibold leading-tight",

  h3:
    "text-lg md:text-xl lg:text-2xl font-semibold leading-snug",

  h4:
    "text-base md:text-lg lg:text-xl font-semibold leading-snug",

  // Body
  bodyLg:
    "text-base md:text-lg font-normal leading-relaxed",

  body:
    "text-sm md:text-base font-normal leading-relaxed",

  bodySm:
    "text-xs md:text-sm font-normal leading-relaxed",

  // UI Text
  button:
    "text-sm md:text-base font-medium",

  input:
    "text-sm md:text-base font-normal",

  label:
    "text-sm md:text-base font-medium",

  // Helper Text
  caption:
    "text-xs font-normal",

  overline:
    "text-xs font-medium uppercase tracking-wider",
} as const;