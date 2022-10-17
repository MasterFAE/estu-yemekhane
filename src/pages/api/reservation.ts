// Example of a restricted endpoint that only authenticated users can access from https://next-auth.js.org/getting-started/example

import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from "../../server/db/client";

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session) res.status(401).json({});

  switch (req.method) {
    case "GET":
      const reservation = await prisma.reservedDine.findMany({
        where: { userId: session?.user?.id },
        include: { Dine: { include: { foods: true } } },
      });
      break;

    default:
      res.status(400).json({});
      break;
  }
};

export default restricted;
