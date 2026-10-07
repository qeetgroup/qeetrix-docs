import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@qeetrix/ui";

/** Header with an action slot, content, and a footer for the card's own actions. */
export default function CardDefault() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="font-mono">QP-INV-2026-00412</CardTitle>
        <CardDescription>Acme India Pvt Ltd · due 15 Oct</CardDescription>
        <CardAction>
          <Badge variant="warning">Due in 3 days</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>₹1,20,000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">IGST 18%</span>
          <span>₹21,600</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>₹1,41,600</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm">
          Download PDF
        </Button>
        <Button size="sm" className="ms-auto">
          Send reminder
        </Button>
      </CardFooter>
    </Card>
  );
}
