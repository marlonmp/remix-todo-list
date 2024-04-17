import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type TodoItem = {
    id: string,
    title: string,
    description: string,
    is_done: boolean,
    date: string,
    created: string,
    updated: string,
};

export const loader = async () => {
    const response = await fetch('http://127.0.0.1:8090/api/collections/todos/records')
    const { items } = await response.json();

    return json({ todos: items });
};

function NoItem() {
    return (
        <div className="italic rounded-lg p-8 text-neutral-500 bg-neutral-700">
            There is no items on this todo list. Try creating one.
        </div>
    );
}

function Item({ id, title, description, is_done, date } : TodoItem) {
    const activeClass = !is_done ? '' : 'line-through italic'

    return (
        <div className="w-full rounded-lg p-8 bg-neutral-700">
            <div className="w-full flex flex-col">
                <div className={`text-2xl text-white ${activeClass}`}>{title}</div>
                <div className="text-lg text-neutral-500">{description}</div>
            </div>
        </div>
    );
}

export default function TodoList() {
    const { todos } = useLoaderData() as any;

    console.log(todos);

    const items = !todos?.length ? <NoItem /> : todos.map((item: TodoItem) => <Item key={item.id} {...item} />);

    return (
        <div className="w-full flex flex-col items-center space-y-4">{items}</div>
    );
}