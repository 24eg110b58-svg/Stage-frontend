
const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:8080"
}/events`;

async function readResponse(response) {
  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error("You have already registered for this event.");
    }

    const message =
      typeof data === "object" && data !== null
        ? data.message || data.detail || data.error
        : data;

    throw new Error(message || `Request failed (${response.status}).`);
  }

  return data;
}

export async function getEvents() {
  const response = await fetch(API_URL);
  return readResponse(response);
}

export async function createEvent(event) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  return readResponse(response);
}

export async function registerForEvent(eventId, studentId) {
  const response = await fetch(
    `${API_URL}/${encodeURIComponent(eventId)}/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId }),
    }
  );

  return readResponse(response);
}
