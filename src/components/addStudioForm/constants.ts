import {
  AudioLines,
  Camera,
  Clapperboard,
  Mic,
  Palette,
} from "lucide-react";

export const CATEGORIES = [
  { label: "Photo Studios", icon: Camera, detail: "Photography & production" },
  { label: "Sound Stages", icon: Clapperboard, detail: "Film & video shoots" },
  { label: "Podcast Rooms", icon: Mic, detail: "Podcasting & voice work" },
  { label: "Music Suites", icon: AudioLines, detail: "Recording & music" },
  { label: "Art Workshops", icon: Palette, detail: "Artistry & making" },
];

export const FIELD_CONTROL_CLASS =
  "h-11 w-full rounded-lg border-border bg-background px-3.5 text-sm shadow-sm transition-all placeholder:text-muted-foreground/70 hover:border-primary/40 focus-visible:border-primary focus-visible:ring-primary/20";

export const AMENITIES = [
  "High-speed Wi-Fi",
  "Professional lighting",
  "Soundproofing",
  "Changing room",
  "Air conditioning",
  "Free parking",
  "Kitchen access",
  "Wheelchair accessible",
  "Green screen",
  "Recording equipment",
];
