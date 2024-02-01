interface PageProps {
  children: JSX.Element[];
}
export default function Page({ children }: PageProps) {
  return (
    <html>
      <head>
        <title>Dart Score</title>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=144, initial-scale=0.5, user-scalable=no"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kolker+Brush&family=Rozha+One&display=swap"
          rel="stylesheet"
        ></link>
        <link href="./public/output.css" rel="stylesheet" />
        <script src="./public/htmx.min.js"></script>
        <script src="./public/resize.js"></script>
      </head>
      <body class="bg-slate-800 text-slate-300 font-rozha flex flex-col justify-center items-center text-center text-6xl w-fit overflow-hidden">
        {children}
      </body>
    </html>
  );
}
