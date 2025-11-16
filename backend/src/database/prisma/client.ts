import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createPrismaConnection(): Promise<void> {
    await prisma.$connect();
}

async function closePrismaConnection(): Promise<void> {
    await prisma.$disconnect();
}

export { prisma, createPrismaConnection, closePrismaConnection };
