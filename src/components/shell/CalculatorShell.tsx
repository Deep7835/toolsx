import type { ReactNode } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { SlidersHorizontal, Sigma } from "lucide-react";
import { cn } from "@/lib/cn";

export function CalculatorShell({
  inputs,
  results,
  inputTitle = "Inputs",
  inputDescription,
  resultTitle = "Results",
  resultDescription,
  resultAction,
  note,
  wide,
  below,
}: {
  inputs: ReactNode;
  results: ReactNode;
  inputTitle?: ReactNode;
  inputDescription?: ReactNode;
  resultTitle?: ReactNode;
  resultDescription?: ReactNode;
  resultAction?: ReactNode;
  note?: ReactNode;
  wide?: boolean;
  below?: ReactNode;
}) {
  return (
    <div>
      <div className={cn("grid gap-5 lg:grid-cols-12 items-start")}>
        <Card className={cn("min-w-0", wide ? "lg:col-span-6" : "lg:col-span-5")}>
          <CardHeader title={inputTitle} description={inputDescription} icon={<SlidersHorizontal className="h-4 w-4" strokeWidth={2} />} />
          <CardBody className="grid gap-5">{inputs}</CardBody>
        </Card>
        <Card className={cn("min-w-0 lg:sticky lg:top-24", wide ? "lg:col-span-6" : "lg:col-span-7")}>
          <CardHeader title={resultTitle} description={resultDescription} icon={<Sigma className="h-4 w-4" strokeWidth={2} />} action={resultAction} />
          <CardBody className="grid gap-4">{results}</CardBody>
          {note ? <div className="border-t border-border px-5 py-3 text-xs leading-relaxed text-muted">{note}</div> : null}
        </Card>
      </div>
      {below ? <div className="mt-5">{below}</div> : null}
    </div>
  );
}
