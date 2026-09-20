"use client";
import { useState } from "react";
import { Input, type InputProps } from "./Field";

/** Input that shows a format error only after the user leaves the field (validate on blur, not on keystroke). */
export function ValidatedInput({ validate, value, onBlur, ...rest }: InputProps & { validate: (v: string) => string | undefined; value: string }) {
  const [touched, setTouched] = useState(false);
  const error = touched ? validate(value) : undefined;
  return <Input value={value} error={error} onBlur={(e) => { setTouched(true); onBlur?.(e); }} {...rest} />;
}
