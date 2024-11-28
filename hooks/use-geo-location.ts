"use client";
import { useState, useEffect } from "react";

type LocationPart =
  | "address"
  | "road"
  | "neighbourhood"
  | "number"
  | "suburb"
  | "village"
  | "town"
  | "city"
  | "county"
  | "state"
  | "country"
  | "zip";
export type CoordinateLocations = Record<"loading", boolean> &
  Record<"latitude" | "longitude", number | null> &
  Record<LocationPart, string | null>;

export function useGeoLocation() {
  const [location, setLocation] = useState<CoordinateLocations>({
    loading: true,
    ...{}
  } as CoordinateLocations);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          ) // use `openstreetmap`
            .then(response => response.json())
            .then(data => {
              const loading = latitude === null && longitude === null;
              const partOfAddress: CoordinateLocations = {
                latitude,
                longitude,
                address: data?.display_name,
                road: data?.address.road,
                neighbourhood: data?.address.neighbourhood,
                number: data?.address.house_number,
                suburb: data?.address.suburb,
                village: data?.address.village,
                town: data?.address.town,
                city: data?.address.city,
                county: data?.address.county,
                state: data?.address.state,
                country: data?.address.country,
                zip: data?.address.postcode,
                loading
              };

              setLocation(partOfAddress);
            })
            .catch(error => {
              console.error("Error getting user address:", error);
            });
        },
        function (error) {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported in this browser.");
    }
  }, []);

  return location;
}
