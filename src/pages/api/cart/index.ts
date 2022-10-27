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
      const userDine = await prisma.user.findFirst({
        where: { id: userId },
        select: { reservation: true },
      });
      let result = false;
      for (let i = 0; i < userDine?.reservation?.length; i++) {
        const e = userDine?.reservation[i];
        for (let x = 0; x < req.body.dine.length; x++) {
          const _x = req.body.dine[x];
          if (_x.id === e?.dineId) {
            result = true;
            break;
          }
        }
      }
      if (result) {
        res.status(400).json({ error: "Already exists" });
        return;
      }
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
