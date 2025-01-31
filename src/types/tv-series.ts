import { type Genre } from './genre';
import { type Person } from './person';

export type Episode = Readonly<{
  description: string;
  episodeNumber: number;
  id: number;
  airDate: string;
  seasonNumber: number;
  title: string;
  runtime: number;
  stillImage: string;
}>;

export type Season = Readonly<{
  description: string;
  id: number;
  airDate: string;
  seasonNumber: number;
  title: string;
  episodes: Episode[];
  episodeCount?: number;
}>;

type Language = Readonly<{
  englishName: string;
  name: string;
  code: string;
}>;

type Country = Readonly<{
  name: string;
  code: string;
}>;

export type TvSeries = Readonly<{
  backdropColor: string;
  backdropImage?: string;
  countries: Country[];
  createdBy: Person[];
  description: string;
  firstAirDate: string;
  firstEpisodeToAir: Episode;
  genres: Genre[];
  id: number;
  isAdult: boolean;
  languages: Language[];
  lastAirDate: string;
  lastEpisodeToAir: Episode;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  originalTitle: string;
  posterImage: string;
  releaseYear: string;
  seasons?: Season[];
  slug: string;
  tagline: string;
  title: string;
  titleTreatmentImage?: string;
  voteAverage: number;
  voteCount: number;
}>;

export type TvSeriesAccountStates = Readonly<{
  isFavorited: boolean;
  isWatchlisted: boolean;
}>;
