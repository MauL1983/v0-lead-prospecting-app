import { EmailComposer } from "@/components/email-composer";

export default function OutreachPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold">Outreach</h1>
        <p className="text-sm text-muted-foreground">AI-powered email composer for personalized outreach</p>
      </div>
      <div className="flex-1 min-h-0">
        <EmailComposer />
      </div>
    </div>
  );
}
