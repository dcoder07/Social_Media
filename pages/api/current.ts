import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import authOptions from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { Session } from "next-auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await getServerSession(req, res, authOptions)) as Session;

  if (!session?.user?.email) {
    return res.json(null);
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    return res.json(null);
  }

  return res.json(currentUser);
};

export default handler;
