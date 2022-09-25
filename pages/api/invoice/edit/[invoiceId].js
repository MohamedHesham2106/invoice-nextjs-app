import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
async function handler(req, res) {
  const { invoiceId } = req.query;
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthenticated user." });
  }
  const prisma = new PrismaClient();
  if (req.method === "PUT") {
    try {
      const invoice = await prisma.invoice.update({
        where: {
          id: invoiceId,
        },
        data: {
          senderStreet: req.body.senderStreet,
          senderPostalCode: req.body.senderPostalCode,
          senderCity: req.body.senderCity,
          senderCountry: req.body.senderCountry,
          clientName: req.body.clientName,
          clientEmail: req.body.clientEmail,
          clientCity: req.body.clientCity,
          clientCountry: req.body.clientCountry,
          clientPostalCode: req.body.clientPostalCode,
          clientStreet: req.body.clientStreet,
          paymentDue: new Date(req.body.paymentDue),
          paymentTerms: req.body.paymentTerms,
          description: req.body.description,
          status: req.body.status,
          total: req.body.total,
        },
        include: {
          items: true,
        },
      });

      const Items = req.body.items;
      await prisma.items.deleteMany({
        where: {
          invoiceId: invoice.id,
        },
      });

      for (const item of Items) {
        if (item.name !== "") {
          await prisma.items.create({
            data: {
              invoiceId: invoice.id,
              quantity: +item.quantity,
              name: item.name,
              price: +item.price,
              total: +item.total,
            },
          });
        }
      }
      res.status(200).json({ message: "Invoice updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
export default handler;
