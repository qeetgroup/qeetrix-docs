"use client";

import { Field, FieldLabel, Rating } from "@qeetrix/ui";
import { useState } from "react";

/** With `onChange` the rating takes input: click a star, or focus it and use the arrow keys. Without one it only displays. */
export default function RatingDefault() {
  const [rating, setRating] = useState(4);
  return (
    <Field>
      <FieldLabel>How was your support experience?</FieldLabel>
      <Rating value={rating} onChange={setRating} />
    </Field>
  );
}
