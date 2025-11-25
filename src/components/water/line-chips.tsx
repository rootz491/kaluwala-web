"use client";

import { Line } from "@/types/water";

interface LineChipsProps {
  lines: Line[];
  selectedIds: string[];
  onToggle: (lineId: string) => void;
  disabled?: boolean;
}

export function LineChips({
  lines,
  selectedIds,
  onToggle,
  disabled = false,
}: LineChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {lines.map((line) => {
        const isSelected = selectedIds.includes(line.$id);
        return (
          <button
            key={line.$id}
            onClick={() => onToggle(line.$id)}
            disabled={disabled}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all
              border-2 flex items-center gap-2
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              ${
                isSelected
                  ? "bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200"
                  : "bg-card border-muted hover:border-muted-foreground text-muted-foreground hover:text-foreground"
              }
            `}
          >
            {/* Color indicator */}
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: line.color || "#3b82f6" }}
            />
            {line.name}
            {/* Check mark for selected */}
            {isSelected && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Compact list version of line selection
 */
export function LineCheckList({
  lines,
  selectedIds,
  onToggle,
  disabled = false,
}: LineChipsProps) {
  return (
    <div className="space-y-2">
      {lines.map((line) => {
        const isSelected = selectedIds.includes(line.$id);
        return (
          <label
            key={line.$id}
            className={`
              flex items-center gap-3 p-3 rounded-lg border cursor-pointer
              transition-colors
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              ${
                isSelected
                  ? "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
                  : "bg-card border-muted hover:bg-accent"
              }
            `}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggle(line.$id)}
              disabled={disabled}
              className="w-5 h-5 rounded border-muted accent-blue-600"
            />
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: line.color || "#3b82f6" }}
            />
            <div className="flex-1">
              <p className="font-medium">{line.name}</p>
              {line.description && (
                <p className="text-xs text-muted-foreground">
                  {line.description}
                </p>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}

export default LineChips;
