import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import moment from "moment";

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

function Toggle({ is_active }: { is_active: boolean }) {
    const period = <div className="w-3 h-3 rounded-full bg-blue-500"></div>;

    return (
        <div className="w-6 h-6 rounded-full border-2 border-blue-500 hover:cursor-pointer">
            <div className="w-full h-full flex justify-center items-center">
                {is_active ? period : undefined}
            </div>
        </div>
    );
}

function Item({ id, title, description, is_done, created } : TodoItem) {
    const activeClass = !is_done ? '' : 'line-through italic'

    return (
        <div className="w-full rounded-lg px-8 py-6 bg-neutral-700">
            <div className="w-full flex flex-row space-x-4">
                <div className="pt-1">
                    <Toggle is_active={is_done} />
                </div>
                <div className="flex-grow flex flex-col">
                    <div className={`text-lg text-white ${activeClass}`}>{title}</div>
                    <div className="text-md text-neutral-400">{description}</div>
                    <div className="text-sm text-neutral-500">Created at: {moment(created).format('LLL')}</div>
                </div>
            </div>
        </div>
    );
}

export default function TodoList() {
    const { todos } = useLoaderData() as any;

    const items = !todos?.length ? <NoItem /> : todos.map((item: TodoItem) => <Item key={item.id} {...item} />);

    return (
        <div className="w-full flex flex-col space-y-6">
            <div className="w-full flex flex-row justify-between items-center">
                <div className="font-bold text-white">Todo list</div>
                <div className="px-4 py-2 font-bold rounded-md text-white bg-green-600 hover:cursor-pointer hover:bg-green-700">Add todo</div>
            </div>

            <div className="w-full flex flex-col items-center space-y-4">{items}</div>
        </div>
    );
}