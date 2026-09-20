"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Input, Textarea, Toggle } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/shell/TextOutput";
import { uid } from "@/lib/format";

interface QA { id: string; q: string; a: string }
export default function FaqSchema() {
  const [items, setItems] = useState<QA[]>([{ id: uid(), q: "Do you deliver outside Delhi NCR?", a: "Yes, we ship across India via Delhivery and Blue Dart. Delivery takes 3–6 working days." }, { id: uid(), q: "Can I pay with UPI?", a: "Absolutely — GPay, PhonePe, Paytm and any BHIM UPI app are accepted at checkout." }]);
  const [wrap, setWrap] = useState(true);
  const upd = (id: string, p: Partial<QA>) => setItems(items.map((i) => (i.id === id ? { ...i, ...p } : i)));
  const json = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.filter((i) => i.q && i.a).map((i) => ({ "@type": "Question", name: i.q.trim(), acceptedAnswer: { "@type": "Answer", text: i.a.trim() } })) };
  const out = JSON.stringify(json, null, 2);
  const code = wrap ? `<script type="application/ld+json">\n${out}\n</script>` : out;
  const html = items.filter((i) => i.q && i.a).map((i) => `<details>\n  <summary>${i.q}</summary>\n  <p>${i.a}</p>\n</details>`).join("\n");
  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className="lg:col-span-6 min-w-0">
        <CardHeader title="Questions & answers" description="Google shows FAQ rich results only for pages where the same Q&A is visible to users." action={<Button size="sm" variant="secondary" onClick={() => setItems([...items, { id: uid(), q: "", a: "" }])}><Plus className="h-3.5 w-3.5" /> Add</Button>} />
        <CardBody className="grid gap-3">
          {items.map((i, idx) => (
            <div key={i.id} className="rounded-xl border border-border bg-surface-2/50 p-3 grid gap-2">
              <div className="flex gap-2"><Input aria-label="Question" placeholder={`Question ${idx + 1}`} value={i.q} onChange={(e) => upd(i.id, { q: e.target.value })} wrapClassName="flex-1" /><button type="button" aria-label="Remove" onClick={() => setItems(items.filter((x) => x.id !== i.id))} className="inline-flex h-11 w-10 items-center justify-center rounded-lg text-muted hover:bg-danger-soft hover:text-danger cursor-pointer"><Trash2 className="h-4 w-4" /></button></div>
              <Textarea aria-label="Answer" placeholder="Answer" rows={2} value={i.a} onChange={(e) => upd(i.id, { a: e.target.value })} />
            </div>
          ))}
          <Toggle checked={wrap} onChange={setWrap} label="Wrap in <script> tag" />
        </CardBody>
      </Card>
      <div className="grid gap-4 lg:col-span-6 min-w-0 lg:sticky lg:top-24">
        <CodeBlock value={code} label="JSON-LD · paste in <head> or before </body>" filename="faq-schema.html" mime="text/html" />
        <CodeBlock value={html} label="Matching visible FAQ HTML" filename="faq.html" mime="text/html" wrap />
        <p className="text-xs text-muted">Validate at search.google.com/test/rich-results. Since 2023, FAQ rich results show mainly for government and health sites, but the markup still helps AI overviews and voice search understand your page.</p>
      </div>
    </div>
  );
}
