"use client";

import { COLLECTIONS, databases, DB_ID } from "@/lib/appwrite";
import { localTimeToISO } from "@/lib/time";
import { Line } from "@/types/water";
import { ID } from "appwrite";
import { useState } from "react";

interface ScheduleFormProps {
  lines: Line[];
  userId: string;
  onSuccess?: () => void;
}

interface FormData {
  lineId: string;
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  notes: string;
}

interface FormErrors {
  lineId?: string;
  startTime?: string;
  endTime?: string;
  general?: string;
}

export function ScheduleForm({ lines, userId, onSuccess }: ScheduleFormProps) {
  const [formData, setFormData] = useState<FormData>({
    lineId: "",
    startTime: "",
    endTime: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.lineId) {
      newErrors.lineId = "Please select a water line";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }

    // Check end time is after start time
    if (formData.startTime && formData.endTime) {
      const [startH, startM] = formData.startTime.split(":").map(Number);
      const [endH, endM] = formData.endTime.split(":").map(Number);
      const startMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;

      if (endMinutes <= startMinutes) {
        newErrors.endTime = "End time must be after start time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const selectedLine = lines.find((l) => l.$id === formData.lineId);
      const startAtISO = localTimeToISO(formData.startTime);
      const endAtISO = localTimeToISO(formData.endTime);

      await databases.createDocument(
        DB_ID,
        COLLECTIONS.SCHEDULES,
        ID.unique(),
        {
          lineId: formData.lineId,
          lineName: selectedLine?.name || "",
          startAt: startAtISO,
          endAt: endAtISO,
          status: "upcoming",
          notes: formData.notes || null,
          createdBy: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );

      setSuccessMessage("Schedule created successfully!");
      setFormData({
        lineId: "",
        startTime: "",
        endTime: "",
        notes: "",
      });

      onSuccess?.();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Failed to create schedule:", err);
      setErrors({
        general:
          err instanceof Error ? err.message : "Failed to create schedule",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* General Error */}
      {errors.general && (
        <div className="p-3 rounded-lg bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-sm">
          {errors.general}
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="p-3 rounded-lg bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-sm">
          ✓ {successMessage}
        </div>
      )}

      {/* Line Selection */}
      <div>
        <label htmlFor="lineId" className="block text-sm font-medium mb-1.5">
          Water Line <span className="text-red-500">*</span>
        </label>
        <select
          id="lineId"
          name="lineId"
          value={formData.lineId}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`
            w-full px-3 py-2.5 rounded-lg border bg-background
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${errors.lineId ? "border-red-500" : "border-input"}
          `}
        >
          <option value="">Select a line...</option>
          {lines.map((line) => (
            <option key={line.$id} value={line.$id}>
              {line.name}
            </option>
          ))}
        </select>
        {errors.lineId && (
          <p className="text-red-500 text-xs mt-1">{errors.lineId}</p>
        )}
      </div>

      {/* Time Inputs */}
      <div className="grid grid-cols-2 gap-4">
        {/* Start Time */}
        <div>
          <label
            htmlFor="startTime"
            className="block text-sm font-medium mb-1.5"
          >
            Start Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`
              w-full px-3 py-2.5 rounded-lg border bg-background
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              ${errors.startTime ? "border-red-500" : "border-input"}
            `}
          />
          {errors.startTime && (
            <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
          )}
        </div>

        {/* End Time */}
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium mb-1.5">
            End Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`
              w-full px-3 py-2.5 rounded-lg border bg-background
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              ${errors.endTime ? "border-red-500" : "border-input"}
            `}
          />
          {errors.endTime && (
            <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium mb-1.5">
          Notes <span className="text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          disabled={isSubmitting}
          rows={2}
          placeholder="Any additional information..."
          className="
            w-full px-3 py-2.5 rounded-lg border border-input bg-background
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            resize-none
          "
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full py-3 px-4 rounded-lg font-medium
          bg-blue-600 text-white hover:bg-blue-700
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
        "
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Creating...
          </span>
        ) : (
          "Create Schedule"
        )}
      </button>
    </form>
  );
}

export default ScheduleForm;
