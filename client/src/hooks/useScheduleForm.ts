import { useState } from "react";
import { ZodError, type ZodSchema } from "zod";
import { useScheduleStore } from "@/store/scheduleStore";
import { useScheduleConflicts } from "@/hooks/useScheduleConflicts";
import type { ScheduleFormData, ScheduleFormValues } from "@/types/formDataTypes";

interface UseScheduleFormParams {
   schemaAction: ZodSchema<ScheduleFormValues>;
   preconvertate?: (data: ScheduleFormValues) => ScheduleFormValues;
}

interface UseScheduleFormResult {
   formErrors: Record<string, string>;
   onFinish: (data: ScheduleFormValues) => void;
}

export const useScheduleForm = ({ schemaAction, preconvertate }: UseScheduleFormParams): UseScheduleFormResult => {
   const { addEntry } = useScheduleStore();
   const { checkConflicts } = useScheduleConflicts();

   const [formErrors, setFormErrors] = useState<Record<string, string>>({});

   const onFinish = (rawData: ScheduleFormValues) => {
      setFormErrors({});

      try {
         const prepared = preconvertate ? preconvertate(rawData) : rawData;

         const parsed = schemaAction.parse(prepared);

         const conflict = checkConflicts(parsed as ScheduleFormData);

         if (conflict.hasConflict) {
            setFormErrors({ _form: String(conflict)});
            
            return;
         }

         addEntry('scheduleSlots', parsed);
      }

      catch (err) {
         if (!(err instanceof ZodError)) return;

         const errors: Record<string, string> = {};

         err.issues.forEach(issue => {
            const field = issue.path[0] as string;

            if (!errors[field]) {
               errors[field] = issue.message;
            }
         });

         setFormErrors(errors);
      }
   };

   return { formErrors, onFinish };
};
