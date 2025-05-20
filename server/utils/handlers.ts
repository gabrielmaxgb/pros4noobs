import { ZodTypeAny, z, ZodIssue } from 'zod';

export const parseAndValidate = <TSchema extends ZodTypeAny>(schema: TSchema, body: any): [z.infer<TSchema>, ZodIssue[] | null] => {
  const parsedBody = schema.safeParse(body);

  if (!parsedBody.success) {
    return [ null, parsedBody.error.errors ];
  }

  return [ parsedBody.data, null ];
}