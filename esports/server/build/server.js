import express from "express";
const app = express();
app.use(express.json());
app.get("/", () => { });
app.listen(3333, (request, response) => {
    console.log("Server is started");
});
