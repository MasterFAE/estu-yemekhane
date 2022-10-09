// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";

const Cart = async (req: NextApiRequest, res: NextApiResponse) => {
  // const examples = await prisma.example.findMany();
  // res.status(200).json(examples);

  const session = await getServerAuthSession({ req, res });
  if (!session) res.status(401);

  switch (req.method) {
    case "GET":
      let user = await prisma.user.findFirst({
        where: { id: session?.user?.id },
        select: {
          cart: { include: { dine: { include: { foods: true } } } },
        },
      });
      res.status(200).json(user?.cart);
      break;
  }
};

export default Cart;
