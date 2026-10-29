import type { SVGProps } from "react";

export type IconName =
  | "search"
  | "download"
  | "person_add"
  | "expand_more"
  | "verified"
  | "unverified"
  | "more_horiz"
  | "chevron_left"
  | "chevron_right";

const ICON_PATHS: Record<IconName, string> = {
  search:
    "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  download: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
  person_add:
    "M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3H3v-2h3V7h2v3h3v2H8v3H6z",
  expand_more: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z",
  verified:
    "M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z",
  unverified:
    "M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-8.09 3.5L12 12.6l-2.91 2.9-1.41-1.41L10.59 11.19 7.68 8.28l1.41-1.41L12 9.77l2.91-2.9 1.41 1.41-2.91 2.91 2.91 2.91-1.41 1.41z",
  more_horiz:
    "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
  chevron_left: "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z",
  chevron_right: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
};

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
