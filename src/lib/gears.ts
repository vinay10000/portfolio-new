export type GearLink = { name: string; href?: string };
export type GearGroup = {
  title: string;
  icon: "laptop" | "grid" | "box";
  items: GearLink[];
  numbered?: boolean;
};

const g = (name: string, href?: string): GearLink => ({ name, href });

/**
 * Placeholder. Replace these with the kit you actually work on and point each
 * one at its real product page. An item with no href renders as plain text,
 * so leaving one blank never produces a link that goes nowhere.
 */
export const gearGroups: GearGroup[] = [
  {
    title: "Devices & Accessories",
    icon: "laptop",
    items: [
      g("Laptop"),
      g("Mechanical Keyboard"),
      g("Mouse"),
      g("Monitor"),
      g("Studio Microphone"),
    ],
  },
  {
    title: "Editor Extensions",
    icon: "grid",
    numbered: true,
    items: [
      g("ESLint"),
      g("Prettier"),
      g("GitLens"),
      g("Tailwind CSS IntelliSense"),
      g("Path Intellisense"),
      g("Error Lens"),
    ],
  },
  {
    title: "Software",
    icon: "box",
    numbered: true,
    items: [
      g("VS Code"),
      g("Opencode"),
      g("Postman"),
      g("Docker Desktop"),
      g("Claude Code"),
      g("Git"),
    ],
  },
];
