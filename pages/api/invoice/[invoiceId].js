import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
async function handler(req, res) {
  if (req.method === "GET" || req.method === "POST" || req.method === "PATCH") {
    return;
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthenticated user." });
  }
  const prisma = new PrismaClient();
  const { invoiceId } = req.query;
  if (req.method === "PUT") {
    try {
      await prisma.invoice.update({
        data: {
          status: "paid",
        },
        where: {
          id: invoiceId,
        },
      });

      res.status(200).json({ message: "Invoice status: paid" });
    } catch (error) {
      res.status(500).json({ message: "Invoice status update failed" });
    }
  }
  if (req.method === "DELETE") {
    try {
      await prisma.invoice.delete({
        where: {
          id: invoiceId,
        },
      });

      res.status(200).json({ message: "Invoice deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Invoice failed to be deleted" });
    }
  }
}
export default handler;
