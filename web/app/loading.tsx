import { LoadingAgent } from "@/components/LoadingAgent";

// App Router renders this automatically during route transitions / server fetches.
export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <LoadingAgent steps={["Loading Kazi Connect…", "Almost there…"]} />
    </div>
  );
}
