import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { clockValidationSchema } from 'validationSchema/clocks';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.clock
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getClockById();
    case 'PUT':
      return updateClockById();
    case 'DELETE':
      return deleteClockById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getClockById() {
    const data = await prisma.clock.findFirst(convertQueryToPrismaUtil(req.query, 'clock'));
    return res.status(200).json(data);
  }

  async function updateClockById() {
    await clockValidationSchema.validate(req.body);
    const data = await prisma.clock.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    if (req.body.name) {
      await roqClient.asUser(roqUserId).updateTenant({ id: user.tenantId, tenant: { name: req.body.name } });
    }
    return res.status(200).json(data);
  }
  async function deleteClockById() {
    const data = await prisma.clock.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
