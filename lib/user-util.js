export async function createUser(email, password, name) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({  email, password, name }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}