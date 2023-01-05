// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";

const CartItem = async (req: NextApiRequest, res: NextApiResponse) => {
  // const examples = await prisma.example.findMany();
  // res.status(200).json(examples);

  const session = await getServerAuthSession({ req, res });
  if (!session) res.status(401);
  const { method } = req;
  let id = session?.user?.id;
  // let dineId: number = parseInt(req.query.id);
  let dineId = req.query.id;
  const userCart = await prisma.cart.findFirst({
    where: { userId: id },
    include: { dine: true },
  });
  switch (method) {
    case "DELETE":
      if (userCart?.dine.filter((e) => e.id === dineId).length < 1) {
        res.status(409).json({ error: "Item doesn't exist" });
        break;
      }
      await prisma.dine.update({
        where: { id: dineId },
        data: { cart: { disconnect: { userId: id } } },
      });
      res.status(200).json({ message: "Deleted" });
      break;

    case "POST":
      if (!userCart) {
        let createdCart = await prisma.cart.create({
          data: {
            user: { connect: { id: id } },
            dine: { connect: { id: dineId } },
          },
        });
        res.status(200).json(createdCart);
        break;
      }

      if (userCart.dine.filter((e) => e.id === dineId).length > 0) {
        res.status(409).json({ error: "Already exists" });
        break;
      }

      let cart = await prisma.cart.update({
        where: { userId: id },
        data: {
          dine: { connect: { id: dineId } },
        },
      });
      res.status(200).json(cart);

      break;
  }
};

export default CartItem;
