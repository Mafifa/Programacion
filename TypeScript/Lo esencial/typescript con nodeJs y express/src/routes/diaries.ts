import express from "express";
import * as diaryServices from "../services/diaryServices.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo());
});

router.get("/:id", (req, res) => {
  const diary = diaryServices.findById(+req.params.id);
  return diary != null ? res.send(diary) : res.sendStatus(404);
});

router.post("/", (req, res) => {
  try {
    const { date, weather, visiblity, comment } = req.body;

    const newDiaryEntry = diaryServices.addDiary({
      date,
      weather,
      visiblity,
      comment,
    });
    res.json(newDiaryEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
