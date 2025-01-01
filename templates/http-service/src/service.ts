function getExamples() {
    return [];
}

interface Example {
    foo: string;
    bar: string;
    baz: string;
}

function saveExample(example: Example) {
    return example;
}

function deleteExample(id: number) {
    return id;
}

export default { getExamples, saveExample, deleteExample };
