import { z } from 'zod';

export const BaseModelSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    code: z.string(),
    message: z.string(),
    data: dataSchema,
  });

export type BaseModel<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof BaseModelSchema<T>>>;
