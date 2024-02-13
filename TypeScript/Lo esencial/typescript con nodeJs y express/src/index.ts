import express from "express";
import diaryRouter from "./routes/diaries.ts";
const PORT = 3000;

const app = express();
app.use(express.json()); //Middlaware que transformala req.body a un json

//Direcciones
app.get("/ping", (_req, res) => {
  console.log("Alguien pingeo");
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);

//Starting the server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
