import { timelineItems } from "@/app/data/timeline"
import { Timeline } from "../ui/timeline"

export default function TimelineComponent() {
  return (
    <div className="relative w-full overflow-clip">
      <Timeline items={timelineItems} />
    </div>
  )
}

