import type { LinksFunction } from "@remix-run/node";

import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import styles from "./tailwind.css?url";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-neutral-800">

        <header className="flex flex-row justify-center bg-neutral-900">
          <div className="w-full lg:w-[1024px] px-2 py-4">
            <div className="w-full flex flex-row items-center justify-between space-x-8">
              <div className="font-bold text-2xl text-neutral-100">Todo list app</div>

              <div className="flex flex-row grow space-x-2">
                <Link to={"/"} className="px-4 py-2 text-neutral-300 underline rounded-md hover:bg-neutral-800">Home</Link>
                <Link to={"/todos"} className="px-4 py-2 text-neutral-300 underline rounded-md hover:bg-neutral-800">Todos</Link>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full lg:w-[1024px] mx-auto mt-12 p-4">
          {children}
        </main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];