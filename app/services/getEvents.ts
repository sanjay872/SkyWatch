import { getJson } from "serpapi";

export async function getEventsByCity(city: string): Promise<any> {
    const API_KEY = process.env.NEXT_PUBLIC_API_SERPAPI_KEY;

    return new Promise((resolve, reject) => {
        getJson({
            api_key: API_KEY,
            engine: "google_events",
            q: "Events in " + city,
        }, (json) => {
            if (json) {
                try {
                    resolve(JSON.stringify(json.events_results));
                } catch (error) {
                    reject(new Error("Failed to parse JSON response"));
                }
            } else {
                reject(new Error("Failed to fetch events"));
            }
        });
    });
}