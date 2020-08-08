import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

import app from "./app";

dotenvExpand(dotenv.config());

const servePort = process.env.PORT || 3333;

app.listen(servePort, () => {
  console.log(`
    🚀 Server started on port ${servePort}
    URL: ${process.env.URL || `http://localhost:${servePort}`}
  `);
});
