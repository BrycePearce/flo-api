-- CreateTable
CREATE TABLE "FLOEntity" (
    "cert_body" VARCHAR(100) NOT NULL,
    "cert_product" TEXT[],
    "cert_standard" TEXT[],
    "cert_status" VARCHAR(50) NOT NULL,
    "lic_body" VARCHAR(100) NOT NULL,
    "lic_status" VARCHAR(50) NOT NULL,
    "op_address" VARCHAR(200),
    "op_altname" VARCHAR(300),
    "op_country" VARCHAR(100) NOT NULL,
    "op_countryCode" VARCHAR(3) NOT NULL,
    "op_floId" INTEGER NOT NULL,
    "op_isCertified" BOOLEAN NOT NULL,
    "op_key" VARCHAR(100) NOT NULL,
    "op_name" VARCHAR(300) NOT NULL,
    "op_region" VARCHAR(100) NOT NULL,
    "op_subregion" VARCHAR(100),
    "search_score" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "FLOEntity_pkey" PRIMARY KEY ("op_floId")
);

-- CreateIndex
CREATE UNIQUE INDEX "FLOEntity_op_floId_key" ON "FLOEntity"("op_floId");

-- CreateIndex
CREATE INDEX "idx_op_name" ON "FLOEntity"("op_name");

-- CreateIndex
CREATE INDEX "idx_op_region" ON "FLOEntity"("op_region");

-- CreateIndex
CREATE INDEX "idx_cert_body" ON "FLOEntity"("cert_body");

-- CreateIndex
CREATE INDEX "idx_op_altname" ON "FLOEntity"("op_altname");

-- CreateIndex
CREATE INDEX "idx_op_country" ON "FLOEntity"("op_country");

-- CreateIndex
CREATE INDEX "idx_lic_status" ON "FLOEntity"("lic_status");

-- CreateIndex
CREATE INDEX "idx_cert_status" ON "FLOEntity"("cert_status");

-- CreateIndex
CREATE INDEX "idx_op_countryCode" ON "FLOEntity"("op_country");

-- CreateIndex
CREATE INDEX "idx_search_score" ON "FLOEntity"("search_score");
