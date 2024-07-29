import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
// import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import i18next from "~/i18next.server";
import { LoaderFunction } from "@remix-run/node";
// import { useChangeLanguage } from "remix-i18next/react";

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18next.getLocale(request);
  return json({ locale: locale });
};

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

export function Layout({ children }: { children: React.ReactNode }) {
  const _ = useLoaderData<typeof loader>();

  const { i18n } = useTranslation();
  console.log(i18n);
  // useChangeLanguage(locale);

  return (
    <html lang="en" dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/favicon.svg" />
        <Meta />
        <Links />
      </head>
      <body className="dark:bg-black dark:text-white">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// export function ErrorBoundary() {
//   const error = useRouteError();
//   // const { locale } = useLoaderData<typeof loader>();

//   const { i18n } = useTranslation();
//   // useChangeLanguage(locale);

//   return (
//     <html lang="en" dir={i18n.dir()}>
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/public/favicon.svg" />
//         <Meta />
//         <Links />
//       </head>
//       <body className="dark:bg-black dark:text-white">
//         {/* add the UI you want your users to see */}
//         <h1>{"Oh no, you're not a good man"}</h1>
//         <Scripts />
//       </body>
//     </html>
//   );
// }

export default function App() {
  return <Outlet />;
}
