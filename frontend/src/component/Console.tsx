import { useEffect } from "react";
// go
import { EventsOn } from "../../wailsjs/runtime/runtime";

export const Console = () => {
  // get emitted stdout from backend
  useEffect(() => {
    EventsOn("stdout", (data: any) => {
      console.log(data);
    });
  });

  return (
    <div className="mockup-code h-60">
      <pre data-prefix="$">
        <code>asset management console</code>
      </pre>
      <pre data-prefix=">" className="text-primary">
        <code>waiting...</code>
      </pre>
    </div>
  );
};
