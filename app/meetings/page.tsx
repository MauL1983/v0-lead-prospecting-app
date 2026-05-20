import { MeetingBooker } from "@/components/meeting-booker";

export default function MeetingsPage() {
  return (
    <div className="flex flex-col h-screen p-6">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">Meetings</h1>
        <p className="text-sm text-muted-foreground">Schedule and manage your sales meetings</p>
      </div>
      <div className="flex-1 min-h-0">
        <MeetingBooker />
      </div>
    </div>
  );
}
