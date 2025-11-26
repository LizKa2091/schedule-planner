import { useState } from "react";
import { ZodError, type ZodSchema } from "zod";
import { useScheduleStore } from "@/store/scheduleStore";
import type { EntityType } from "@/store/scheduleTypes";

interface IUseZodFormParams<Shape> {
   schemaAction: ZodSchema<Shape>;
   entityName: EntityType;
   preconvertate?: (data: Shape) => Shape;
}

interface UseZodFormResult<Shape> {
   formErrors: Record<string, string>;
   onFinish: (formData: Shape) => void;
}

export const useZodForm = <Shape extends object>({ 
   schemaAction, entityName, preconvertate 
}: IUseZodFormParams<Shape>): UseZodFormResult<Shape> => {
   const { addEntry } = useScheduleStore();
   const [formErrors, setFormErrors] = useState<Record<string, string>>({});

   const onFinish = (formData: Shape) => {
      setFormErrors({});

      try {
         const preconverted = preconvertate ? preconvertate(formData) : formData;

         const data = schemaAction.parse(preconverted);

         addEntry(entityName, data);
      }
      catch (err) {
         if (!(err instanceof ZodError)) return;

         const errors: Record<string, string> = {};

         err.issues.forEach((issue) => {
            const field = issue.path[0] as string;
            if (!errors[field]) {
               errors[field] = issue.message;
            }
         });

         setFormErrors(errors);
      }
   }

   return { formErrors, onFinish };
} 