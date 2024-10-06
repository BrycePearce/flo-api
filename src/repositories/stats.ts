import prisma from "../prisma/prismaClient";

export const getTopCertifiedProducts = async () =>
    await prisma.$queryRaw<
        { cert_product: string; count: number }[]
    >`
    SELECT
      cert_product,
      COUNT(*)::int AS count
    FROM (
      SELECT unnest(cert_product) AS cert_product
      FROM "FLOEntity"
      WHERE cert_product IS NOT NULL
    ) AS unnested
    GROUP BY cert_product
    ORDER BY count DESC
    LIMIT 10;
  `;


export const getTopCertificationStandards = async () =>
    await prisma.$queryRaw<
        { cert_standard: string; count: number }[]
    >`
  SELECT
    cert_standard,
    COUNT(*)::int AS count
  FROM (
    SELECT unnest(cert_standard) AS cert_standard
    FROM "FLOEntity"
    WHERE cert_standard IS NOT NULL
  ) AS unnested
  GROUP BY cert_standard
  ORDER BY count DESC
  LIMIT 10;
`;