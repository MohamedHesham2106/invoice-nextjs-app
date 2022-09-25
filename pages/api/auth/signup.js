import { PrismaClient } from "@prisma/client";
import passwordValidator from "password-validator";
import { hashPassword } from "../../../lib/auth-util";
import EmailValidator from "email-validator";

const schema = new passwordValidator();
const prisma = new PrismaClient();
async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { email, password, name } = data;

  if (!name || name.trim() === "") {
    return res.status(422).json({ message: "Please Enter Your Name." });
  }


  // email is valid

  if (EmailValidator.validate(email) === false) {
    return res.status(422).json({
      message: "Email Invalid, Enter in the format:name@example.com.",
    });
  }

  // email already exists
  const emailExist = await prisma.user.count({ where: { email: email } });
  if (emailExist > 0) {
    prisma.$disconnect();
    return res
      .status(422)
      .json({ message: "This email address is already being used!" });
  }

  // password validation
  schema
    .is()
    .min(7)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .not()
    .spaces();

  if (!schema.validate(password)) {
    return res.status(422).json({ message: "Password is invalid" });
  }
  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      password: hashedPassword,
      email: email,
      name: name,
    },
  });
  prisma.$disconnect();
  res.status(201).json({ message: "Created User successfully" });
}
export default handler;
