
const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:8080"
}/students`;

async function readResponse(response) {
  const text = await response.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null
        ? data.message || data.error
        : data;

    throw new Error(
      message || `Request failed with status ${response.status}`
    );
  }

  return data;
}

export async function getStudents() {
  const response = await fetch(API_URL);
  return readResponse(response);
}

export async function registerStudent(student) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  return readResponse(response);
}

export async function loginStudent(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (response.status === 401) {
    throw new Error("Incorrect email or password.");
  }

  return readResponse(response);
}