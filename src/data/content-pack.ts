// Rows copied from "Kyoto Weekend Prototype Content Pack.xlsx".
// The note row under each header is not included. The sheet has no photo URLs,
// so the cards use placeholder image boxes.

export type StayRow = {
  id: string;
  listingTitle: string;
  propertyType: string;
  neighbourhood: string;
  nights: number;
  pricePerNightUsd: number;
  totalFor2NightsUsd: number;
  guestRating: number;
  reviewCount: number;
  hostFirstName: string;
  highlight: string;
  checkIn: string;
  checkOut: string;
};

export type ExperienceRow = {
  id: string;
  title: string;
  category: string;
  hostFirstName: string | null;
  date: string;
  startTime: string;
  durationHours: number;
  pricePerGuestUsd: number;
  totalFor2GuestsUsd: number;
  rating: number;
  meetingPoint: string;
  availability: "Spots open" | "Sold out";
};

export type FoodRow = {
  id: string;
  placeName: string;
  cuisine: string;
  neighbourhood: string;
  meal: string;
  priceLevel: string;
  estCostFor2Usd: number;
  walkFromStayMin: number;
  bookingNote: string | null;
};

export const stays: StayRow[] = [
  { id: "S1", listingTitle: "Restored machiya townhouse near Gion", propertyType: "Entire townhouse", neighbourhood: "Gion", nights: 2, pricePerNightUsd: 168, totalFor2NightsUsd: 366, guestRating: 4.92, reviewCount: 214, hostFirstName: "Kenji", highlight: "Private garden and cedar soaking tub", checkIn: "2025-04-11", checkOut: "2025-04-13" },
  { id: "S2", listingTitle: "Quiet tatami room by the Kamo River", propertyType: "Private room in home", neighbourhood: "Shimogyo", nights: 2, pricePerNightUsd: 142, totalFor2NightsUsd: 312, guestRating: 4.88, reviewCount: 163, hostFirstName: "Yumi", highlight: "Riverside walk to Pontocho in 10 minutes", checkIn: "2025-04-11", checkOut: "2025-04-13" },
  { id: "S3", listingTitle: "Bright two-room flat off Sanjo Street", propertyType: "Entire apartment", neighbourhood: "Nakagyo", nights: 2, pricePerNightUsd: 112, totalFor2NightsUsd: 249, guestRating: 4.71, reviewCount: 412, hostFirstName: "Haruto", highlight: "Two blocks from Nishiki Market", checkIn: "2025-04-11", checkOut: "2025-04-13" },
  { id: "S4", listingTitle: "Design ryokan suite with garden view", propertyType: "Private room in ryokan", neighbourhood: "Higashiyama", nights: 2, pricePerNightUsd: 290, totalFor2NightsUsd: 612, guestRating: 4.97, reviewCount: 38, hostFirstName: "Emi", highlight: "Kaiseki breakfast served in your room", checkIn: "2025-04-11", checkOut: "2025-04-13" },
];

export const experiences: ExperienceRow[] = [
  { id: "E1", title: "Tea ceremony in a 100-year-old machiya", category: "Culture", hostFirstName: "Mei", date: "2025-04-12", startTime: "10:30", durationHours: 2, pricePerGuestUsd: 58, totalFor2GuestsUsd: 116, rating: 4.96, meetingPoint: "Outside Gion-Shijo Station, exit 6", availability: "Spots open" },
  { id: "E2", title: "Nishiki Market tasting walk with a local cook", category: "Food & drink", hostFirstName: "Takumi", date: "2025-04-12", startTime: "11:00", durationHours: 3, pricePerGuestUsd: 85, totalFor2GuestsUsd: 170, rating: 4.91, meetingPoint: "Teramachi entrance to Nishiki Market", availability: "Spots open" },
  { id: "E3", title: "Dawn walk through Fushimi Inari's upper gates", category: "Nature", hostFirstName: "Ren", date: "2025-04-12", startTime: "06:00", durationHours: 2.5, pricePerGuestUsd: 38, totalFor2GuestsUsd: 76, rating: 4.99, meetingPoint: "Main torii gate, Fushimi Inari Taisha", availability: "Sold out" },
  { id: "E4", title: "Throw a tea bowl in a Kiyomizu pottery studio", category: "Craft", hostFirstName: null, date: "2025-04-12", startTime: "14:00", durationHours: 1.5, pricePerGuestUsd: 72, totalFor2GuestsUsd: 144, rating: 4.84, meetingPoint: "Gojozaka bus stop, Higashiyama side", availability: "Spots open" },
];

export const food: FoodRow[] = [
  { id: "F1", placeName: "Menya Inoichi", cuisine: "Ramen", neighbourhood: "Gion", meal: "Dinner", priceLevel: "$", estCostFor2Usd: 34, walkFromStayMin: 8, bookingNote: "No reservations - arrive before 18:00" },
  { id: "F2", placeName: "Sagano Yudofu-tei", cuisine: "Tofu", neighbourhood: "Arashiyama", meal: "Lunch", priceLevel: "$$", estCostFor2Usd: 64, walkFromStayMin: 25, bookingNote: null },
  { id: "F3", placeName: "Nishiki Tamago & Skewer Stall", cuisine: "Market street food", neighbourhood: "Nishiki Market", meal: "Snack stop", priceLevel: "$", estCostFor2Usd: 30, walkFromStayMin: 14, bookingNote: "Cash only - most stalls close by 17:00" },
  { id: "F4", placeName: "Pontocho kaiseki counter", cuisine: "Kaiseki", neighbourhood: "Pontocho", meal: "Dinner", priceLevel: "$$$", estCostFor2Usd: 180, walkFromStayMin: 6, bookingNote: "Book 3 days ahead" },
];
