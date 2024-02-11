export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";
export type Visibility = "great" | "good" | "ok" | "poor";

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visiblity: Visibility;
  comment: string;
}

export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, "comment">;
