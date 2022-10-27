import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";

export default async function dineHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });
  if (!session) res.status(401);

  switch (req.method) {
    case "GET":
      const dines = await prisma.dine.findMany({ include: { foods: true } });

      res.status(200).json(dines);
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
