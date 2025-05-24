import { ZodTypeAny, z, ZodIssue } from 'zod';

const defineSafeHandler = (handler: (event: any) => Promise<any>) => {
  return defineEventHandler(async (event) => {
    try {
      return await handler(event);
    }
    catch (error: any) {
      console.error('Error in handler:', error);
      return InternalServerError();
    }
  });
}

const parseAndValidate = <TSchema extends ZodTypeAny>(schema: TSchema, body: any): [z.infer<TSchema>, ZodIssue[] | null] => {
  const parsedBody = schema.safeParse(body);

  if (!parsedBody.success) {
    return [ null, parsedBody.error.errors ];
  }

  return [ parsedBody.data, null ];
}

const useBodySchemaAsync = async <TSchema extends ZodTypeAny>(schema: TSchema): Promise<[z.infer<TSchema>, ZodIssue[] | null]> => {
  const event = useEvent();
  const body = await readBody(event);
  return parseAndValidate(schema, body);
}

export { parseAndValidate, useBodySchemaAsync as useBodyWithSchema, defineSafeHandler };