import { cn } from "@/lib/utils";
import { LuDelete } from "react-icons/lu";

export interface ListItemProps {
  /** Add an extra className to ListItem wrapper */
  className?: string;
  content: React.ReactNode;
  onDelete?: () => void;
}

export const ListItem: React.FunctionComponent<ListItemProps> = ({
  className,
  content,
  onDelete,
}) => {
  return (
    <div className={cn("flex items-center justify-items-center", className)}>
      <div className="grow">{content}</div>
      {onDelete && (
        <button
          className="bg-red-800 text-white p-4 font-bold cursor-pointer"
          onClick={() => onDelete()}
          title="Supprimer"
        >
          <LuDelete />
        </button>
      )}
    </div>
  );
};
