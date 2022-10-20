// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";

const Cart = async (req: NextApiRequest, res: NextApiResponse) => {
  const start = Date.now();
  // const examples = await prisma.example.findMany();
  // res.status(200).json(examples);

  const session = await getServerAuthSession({ req, res });
  if (!session) res.status(401);
  const userId = session?.user?.id;
  switch (req.method) {
    case "GET":
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { dine: { include: { foods: true } } },
      });
      res.status(200).json(cart);
      break;
    case "POST":
      await prisma.cart.update({
        where: { userId },
        data: {
          dine: {
            disconnect: req.body.dine.map((e) => ({ id: e.id })),
          },
        },
      });
      await prisma.reservedDine.createMany({
        data: req.body.dine.map((e) => {
          return {
            userId,
            dineId: e.id,
          };
        }),
      });
      res.status(200).send("OK");
      break;
  }
};

export default Cart;
