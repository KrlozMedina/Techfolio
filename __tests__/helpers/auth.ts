import jwt from "jsonwebtoken";

export function getAuthCookie(role = "admin") {
  const token = jwt.sign(
    { username: "test", role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return `authToken=${token}`;
}
