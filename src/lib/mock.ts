import { experiences, food, stays } from "@/data/content-pack";
import type { PlanResponse } from "./types";

export const ROW_COUNT = Math.min(stays.length, experiences.length, food.length);

const formatHours = (h: number) => `${h} ${h === 1 ? "hour" : "hours"}`;

/** Build a working response from row `index` of each sheet (wraps around). */
export function buildPlan(index: number): PlanResponse {
  const i = ((index % ROW_COUNT) + ROW_COUNT) % ROW_COUNT;
  const s = stays[i];
  const e = experiences[i];
  const f = food[i];

  return [
    {
      cardType: "stay",
      details: {
        destination: "Kyoto, Japan",
        listingTitle: s.listingTitle,
        checkIn: s.checkIn,
        checkOut: s.checkOut,
        nightlyPriceUsd: s.pricePerNightUsd,
        description: `${s.highlight}. ${s.propertyType} in ${s.neighbourhood}.`,
      },
    },
    {
      cardType: "experience",
      details: {
        activityName: e.title,
        duration: formatHours(e.durationHours),
        soldOut: e.availability === "Sold out",
        dayPlan: [
          { day: e.date, plan: `${e.startTime} start · ${e.meetingPoint}` },
          // The Experiences sheet has no Sunday slot (one Date column, all rows Sat 12 Apr).
          // Filler is allowed for empty fields, so say plainly that nothing is planned.
          { day: s.checkOut, plan: "No activity planned in the content pack · checkout day", filler: true },
        ],
      },
    },
    {
      cardType: "food",
      details: {
        restaurantName: f.placeName,
        mealType: f.meal,
        priceRange: f.priceLevel,
        description: [
          `${f.cuisine} in ${f.neighbourhood}, ${f.walkFromStayMin} min walk from your stay.`,
          f.bookingNote ? f.bookingNote.replace(" - ", " · ") + "." : null,
        ]
          .filter(Boolean)
          .join(" "),
      },
    },
  ];
}

export const failedPlan: PlanResponse = [
  {
    cardType: "error",
    details: {
      message: "Sorry, I couldn’t put your Kyoto weekend together just now. Let’s give it another go.",
      buttonLabel: "Try again",
      buttonPosition: "Inside the assistant’s chat bubble, bottom right",
      buttonAction: "Sends the same trip request again",
    },
  },
];
