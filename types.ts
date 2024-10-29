export type chip = {
  name: string;
  isSelected?: boolean;
  id: number;
};

export interface GenreList {
  genres: Genre[];
}

export type movieItem = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type genre = {
  id: number;
  name: string;
};
export type movie_detail2 = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];

  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];

  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    },
  ];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export interface movie_detail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Belongstocollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Productioncompany[];
  production_countries: Productioncountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Spokenlanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface Spokenlanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
interface Productioncountry {
  iso_3166_1: string;
  name: string;
}
interface Productioncompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}
interface Genre {
  id: number;
  name: string;
}
interface Belongstocollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export type thumbnail = {
  aspect_ratio: number;
  height: number;
  iso_639_1?: any;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export interface Review {
  author: string;
  author_details: Authordetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}
interface Authordetails {
  name: string;
  username: string;
  avatar_path?: string;
  rating: number;
}

export interface Section {
  title: string;
  data: thumbnail[][] | unknown[][];
  component: any;
  onPress?: any;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
