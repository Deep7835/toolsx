"use client";
import { useRef, useState, type ReactNode } from "react";
import { Download, Printer, MessageCircle, FileText, Eye, Image as ImageIcon } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PaperPreview } from "./PaperPreview";
import { downloadPdf, downloadPng, printNow, shareWhatsApp } from "@/lib/export";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";

export function DocumentShell({
  form,
  preview,
  paperWidth,
  filename,
  shareText,
  sharePhone,
  formTitle = "Details",
  formDescription,
  previewTitle = "Live preview",
  previewDescription,
  pdfFormat = "a4",
  pngExport,
  extraActions,
  wideForm,
  previewAside,
}: {
  form: ReactNode;
  preview: ReactNode;
  paperWidth: number;
  filename: string;
  shareText?: string;
  sharePhone?: string;
  formTitle?: ReactNode;
  formDescription?: ReactNode;
  previewTitle?: ReactNode;
  previewDescription?: ReactNode;
  pdfFormat?: "a4" | "a5" | "thermal" | "auto";
  pngExport?: boolean;
  extraActions?: ReactNode;
  wideForm?: boolean;
  previewAside?: ReactNode;
}) {
  const paperRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<"pdf" | "png" | null>(null);
  const toast = useToast();

  const pdf = async () => {
    if (!paperRef.current) return;
    setBusy("pdf");
    try {
      await downloadPdf(paperRef.current, filename, { format: pdfFormat });
      toast("PDF downloaded");
    } catch (e) {
      console.error(e);
      toast("Could not generate PDF", "error");
    } finally {
      setBusy(null);
    }
  };
  const png = async () => {
    if (!paperRef.current) return;
    setBusy("png");
    try {
      await downloadPng(paperRef.current, filename);
      toast("PNG downloaded");
    } catch {
      toast("Could not export image", "error");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-12 items-start">
      <Card className={cn("min-w-0", wideForm ? "lg:col-span-6" : "lg:col-span-5")}>
        <CardHeader title={formTitle} description={formDescription} icon={<FileText className="h-4 w-4" strokeWidth={2} />} />
        <CardBody className="grid gap-6">{form}</CardBody>
      </Card>
      <div className={cn("grid gap-5 min-w-0 lg:sticky lg:top-24", wideForm ? "lg:col-span-6" : "lg:col-span-7")}>
        <Card className="min-w-0 overflow-hidden">
          <CardHeader title={previewTitle} description={previewDescription} icon={<Eye className="h-4 w-4" strokeWidth={2} />} />
          <CardBody className="bg-surface-2/60 rounded-b-2xl">
            <PaperPreview width={paperWidth} paperRef={paperRef}>{preview}</PaperPreview>
          </CardBody>
          <div className="flex flex-wrap items-center gap-2 border-t border-border px-5 py-4">
            <Button onClick={pdf} loading={busy === "pdf"}><Download className="h-4 w-4" /> Download PDF</Button>
            <Button variant="secondary" onClick={printNow}><Printer className="h-4 w-4" /> Print</Button>
            {pngExport ? <Button variant="secondary" onClick={png} loading={busy === "png"}><ImageIcon className="h-4 w-4" /> PNG</Button> : null}
            {shareText ? <Button variant="whatsapp" onClick={() => shareWhatsApp(shareText, sharePhone)}><MessageCircle className="h-4 w-4" /> WhatsApp</Button> : null}
            {extraActions}
          </div>
        </Card>
        {previewAside}
      </div>
    </div>
  );
}
