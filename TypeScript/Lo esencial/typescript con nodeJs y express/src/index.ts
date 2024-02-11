import express from "express";
import diaryRouter from "./routes/diaries.ts";

const app = express();
app.use(express.json()); //Middlaware que transformala req.body a un json

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("Alguien pingeo");
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
  console.log(`server running onr port ${PORT}`);
});
