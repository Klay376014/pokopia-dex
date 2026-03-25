export type HabitatId = string

export interface TimeAvailability {
  dawn: boolean
  day: boolean
  dusk: boolean
  night: boolean
}

export interface WeatherAvailability {
  sunny: boolean
  cloudy: boolean
  rainy: boolean
}

export interface Pokemon {
  pokopia_id: string
  national_id: string
  name_zh: string
  artwork_url?: string
  sprite_url?: string
  habitats: HabitatId[]
  time: TimeAvailability
  weather: WeatherAvailability
  skills: string[]
  flavor: string | null
  environment: string | null
  things: string[] | null
}

export interface PokopiaData {
  pokemon: Pokemon[]
}

export interface HabitatInfo {
  id: string
  name: string
  detail_url: string
  detail: string
  pokemon: string[]
}
