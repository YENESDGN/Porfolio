import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge @theme'deki --text-* adlarını tanımaz ve onları renk grubuna atar:
// cn("text-lead", "text-ink") boyutu siliyordu. Yeni bir --text-* token'ı bu listeye de girer.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "caption",
            "small",
            "body",
            "lead",
            "h3",
            "h2",
            "h1",
            "display",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
