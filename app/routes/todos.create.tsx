import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { z } from "zod";

const todoZod = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
});

export const action = async ({ request: req } : ActionFunctionArgs) => {
    const form = await req.formData();

    const result = todoZod.safeParse(Object.fromEntries(form));

    if (!result.success) {
        return json({ error: 'Invalid todo' });
    }

    const res = await fetch('http://127.0.0.1:8090/api/collections/todos/records', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
    })

    const _json = await res.json()

    console.log({ _json })

    return redirect('/todos')
}

export default function TodoCreateForm() {
    return (
        <Form method="post" className="flex flex-col space-y-4">
            <label className="flex flex-col space-y-2">
                <span className="block font-bold text-white">Title *</span>
                <input aria-label="Todo title" name="title" placeholder="Enter the todo title" className="px-3 py-2 rounded-md border-[1px] border-neutral-300 bg-neutral-700" />
            </label>

            <label className="flex flex-col space-y-2">
                <span className="block font-bold text-white">Description</span>
                <input aria-label="Todo description" name="description" placeholder="Enter the todo description" className="px-3 py-2 rounded-md border-[1px] border-neutral-300 bg-neutral-700" />
            </label>

            <button type="submit">Guardar</button>
        </Form>
    );
}