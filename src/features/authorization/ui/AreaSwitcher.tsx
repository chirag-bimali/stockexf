import { Link } from "@tanstack/react-router";
import { AREAS } from "../model/areas";
import { usePermissions } from "../model/usePermissions";

// Shows links to every area the user can enter.
// Renders nothing when the user has access to only one area.
export function AreaSwitcher() {
  const { can } = usePermissions();
  const areas = AREAS.filter((area) => can(area.permission));

  if (areas.length < 2) return null;

  return (
    <div className="flex items-center gap-2 text-sm">
      {areas.map((area) => (
        <Link
          key={area.key}
          to={area.to}
          className="rounded border px-2 py-1"
          activeProps={{ className: "font-semibold bg-black/5" }}
        >
          {area.label}
        </Link>
      ))}
    </div>
  );
}
