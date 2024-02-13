import {
  DiaryEntry,
  NonSensitiveInfoDiaryEntry,
  newDiaryEntry,
} from "../types";
import diaryData from "./diaries.json";

const diaries = diaryData as DiaryEntry[];

export const getDiary = (): DiaryEntry[] => diaries;

export const findById = (
  id: number
): NonSensitiveInfoDiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  if (entry != null) {
    const { comment, ...restOfDiary } = entry;
    return restOfDiary;
  }
  return undefined;
};

//Esto es para retornar los datos sin los comentarios
export const getEntriesWithoutSensitiveInfo =
  (): NonSensitiveInfoDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visiblity }) => {
      return {
        id,
        date,
        weather,
        visiblity,
      };
    });
  };

export const addDiary = (newDiaryEntry: newDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...newDiaryEntry,
  };
  diaries.push(newDiary);
  return newDiary;
};
