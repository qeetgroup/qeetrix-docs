import { Marquee } from "@qeetrix/ui";

const customers = [
  "Northwind Retail",
  "Acme India",
  "Kaveri Logistics",
  "Zenith Foods",
  "Lotus Health",
  "Bharat Mobility",
  "Indus Learning",
  "Saffron Hotels",
];

/**
 * A continuous ticker for logo walls. It pauses while the pointer is over it or focus is inside
 * it, and under reduced motion it stops and wraps its items instead. The loop's second copy is
 * hidden from screen readers and from Tab.
 *
 * @layout wide
 */
export default function MarqueeDefault() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-caption text-muted-foreground">
        Trusted by 2,000+ Indian businesses
      </p>
      <Marquee gap={48}>
        {customers.map((name) => (
          <span
            key={name}
            className="font-heading text-lg font-semibold whitespace-nowrap text-muted-foreground"
          >
            {name}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
