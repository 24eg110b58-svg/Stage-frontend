const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/students`;

export async function getStudents() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json();
}

export async function registerStudent(student) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
}

export async function loginStudent(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Incorrect email or password.");
    }

    if (response.status === 404) {
      throw new Error("Login endpoint not found. Check the backend.");
    }

    throw new Error("Login failed. Please check that the backend is running.");
  }

  return response.json();
}