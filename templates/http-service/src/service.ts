import { z } from "zod";

export const exampleSchema = z.object({
    foo: z.string().min(1),
    bar: z.string().min(1),
    baz: z.string().min(1),
});

export type Example = z.infer<typeof exampleSchema>;

function getExamples() {
    return [];
}

function saveExample(example: Example) {
    return example;
}

function deleteExample(id: number) {
    return id;
}

export default { getExamples, saveExample, deleteExample };
