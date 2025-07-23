import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

console.log("Listening on http://localhost:8000");
serve((req) => new Response("Hello from Deno!"), { port: 8000 }); 