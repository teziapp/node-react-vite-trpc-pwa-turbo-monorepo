import { z } from "zod";

export const zodgetActiveLicCountSchema = z.object({og_id: z.number(), project_id: z.number()});
type T_getActiveLicCountInput = z.infer<typeof zodgetActiveLicCountSchema>;

export const getActiveLicCount = (_props: {input: T_getActiveLicCountInput}) => ({activeLicCount: 1});