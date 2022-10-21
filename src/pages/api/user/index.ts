import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });
  if (!session) res.status(401);
  const { method } = req;
  const name = session?.user?.name;
  switch (method) {
    case "GET":
      const user = await prisma.user.findFirst({
        where: { name },
        select: {
          name: true,
          id: true,
          civId: true,
          image: true,
          department: true,
          reservation: { include: { Dine: { include: { foods: true } } } },
        },
      });
      if (!user) {
        res.status(400).json({ error: "Invalid user" });
        break;
      }
      res.status(200).json(user);
      break;
    case "PUT":
      // Update or create data in your database
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
