import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter } from "react-router";
import { renderToPipeableStream } from "react-dom/server";
import { connectDB } from "./lib/db.server";

connectDB();

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: any
) {
  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        onShellReady() {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(new Response(stream, { headers: responseHeaders, status: responseStatusCode }));
          pipe(body);
        },
        onShellError(error: unknown) { reject(error); },
        onError(error: unknown) { console.error(error); },
      }
    );
  });
}