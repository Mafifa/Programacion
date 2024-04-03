import responseJSON from "../assets/mock/response.json";

export const heros = responseJSON.results;

export function useHero() {
  const mappedHero = heros?.map((hero) => ({
    id: hero.id,
    nameHero: hero.name,
    realName: hero.biography["full-name"],
    work: hero.work.occupation,
    pubisher: hero.biography.publisher,
    gender: hero.appearance.gender,
    race: hero.appearance.race,
    image: hero.image.url,
  }));

  return { hero: mappedHero };
}