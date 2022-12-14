import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthenticated user." });
  }
  const invoice = {
    senderAddress: {
      street: req.body.senderStreet,
      city: req.body.senderCity,
      postalCode: req.body.senderPostal,
      country: req.body.senderCountry,
    },
    clientName: req.body.clientName,
    clientEmail: req.body.clientEmail,
    clientAddress: {
      street: req.body.clientStreet,
      city: req.body.clientCity,
      postalCode: req.body.clientPostal,
      country: req.body.clientCountry,
    },
    paymentDue: req.body.paymentDue,
    paymentTerms: req.body.paymentTerms,
    description: req.body.description,
    status: req.body.status,
    total: req.body.total,
  };
  // console.log(invoice);
  const Items = req.body.items;
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });
    const newInvoice = await prisma.invoice.create({
      data: {
        senderStreet: invoice.senderAddress.street,
        senderCity: invoice.senderAddress.city,
        senderPostalCode: invoice.senderAddress.postalCode,
        senderCountry: invoice.senderAddress.country,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        clientStreet: invoice.clientAddress.street,
        clientCity: invoice.clientAddress.city,
        clientPostalCode: invoice.clientAddress.postalCode,
        clientCountry: invoice.clientAddress.country,
        paymentDue: new Date(invoice.paymentDue),
        paymentTerms: invoice.paymentTerms,
        status: invoice.status,
        description: invoice.description,
        total: invoice.total,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });
    for (const item of Items) {
      if (item.name !== "") {
        await prisma.items.create({
          data: {
            invoiceId: newInvoice.id,
            quantity: +item.quantity,
            name: item.name,
            total: +item.total,
            price: +item.price,
          },
        });
      }
    }
    res.status(200).json({ message: "Added invoice successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while creating invoice" });
  }
}
export default handler;
