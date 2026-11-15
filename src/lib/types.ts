// Mock response shape — matches section 5 of the Kyoto weekend trip cards spec.

export type StayDetails = {
  destination: string;
  listingTitle: string;
  checkIn: string; // ISO date, e.g. "2025-04-11"
  checkOut: string;
  nightlyPriceUsd: number;
  description: string;
};

export type DayPlanEntry = {
  day: string; // ISO date
  plan: string;
  /** True when the workbook has no value for this day and the text is placeholder filler. */
  filler?: boolean;
};

export type ExperienceDetails = {
  activityName: string;
  duration: string;
  dayPlan: DayPlanEntry[];
  soldOut?: boolean;
};

export type FoodDetails = {
  restaurantName: string;
  mealType: string;
  priceRange: string;
  description: string;
};

export type ErrorDetails = {
  message: string;
  buttonLabel: string;
  buttonPosition: string;
  buttonAction: string;
};

export type TripCard =
  | { cardType: "stay"; details: StayDetails }
  | { cardType: "experience"; details: ExperienceDetails }
  | { cardType: "food"; details: FoodDetails }
  | { cardType: "error"; details: ErrorDetails };

export type PlanResponse = TripCard[];
