import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@qeetrix/ui";

const cities = [
  "Bengaluru",
  "Mumbai",
  "Pune",
  "Hyderabad",
  "Chennai",
  "New Delhi",
  "Kolkata",
  "Ahmedabad",
];
const devices = ["Chrome on macOS", "Safari on iPhone", "Edge on Windows"];
const people = ["Aarav Mehta", "Diya Sharma", "Kabir Rao", "Meera Iyer"];

const sessions = Array.from({ length: 16 }, (_, index) => ({
  id: `ses_${(4821 + index * 37).toString(36)}`,
  user: people[index % people.length],
  device: devices[index % devices.length],
  location: cities[index % cities.length],
  started: `${String(9 + Math.floor(index / 2)).padStart(2, "0")}:${index % 2 ? "30" : "05"}`,
}));

/**
 * Give the container a height cap with `containerClassName` and make the `TableHeader`
 * `sticky`, and the header stays in view while the rows scroll.
 *
 * @layout wide
 */
export default function TableStickyHeader() {
  return (
    <Table containerClassName="max-h-72 rounded-lg border border-border">
      <TableHeader sticky>
        <TableRow>
          <TableHead>Session</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Device</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-end">Started</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((session) => (
          <TableRow key={session.id}>
            <TableCell className="font-mono">{session.id}</TableCell>
            <TableCell>{session.user}</TableCell>
            <TableCell>{session.device}</TableCell>
            <TableCell>{session.location}</TableCell>
            <TableCell className="text-end">{session.started}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
