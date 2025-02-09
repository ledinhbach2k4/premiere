import jwt from "jsonwebtoken";

export default function generateToken(user: any): string {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET || "cac", {
    expiresIn: "7d",
  });
}
