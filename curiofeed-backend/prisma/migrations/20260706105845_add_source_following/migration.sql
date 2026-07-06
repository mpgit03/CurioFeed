-- CreateTable
CREATE TABLE "UserSourceFollow" (
    "userId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSourceFollow_pkey" PRIMARY KEY ("userId","sourceId")
);

-- CreateIndex
CREATE INDEX "UserSourceFollow_userId_idx" ON "UserSourceFollow"("userId");

-- CreateIndex
CREATE INDEX "UserSourceFollow_sourceId_idx" ON "UserSourceFollow"("sourceId");

-- AddForeignKey
ALTER TABLE "UserSourceFollow" ADD CONSTRAINT "UserSourceFollow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSourceFollow" ADD CONSTRAINT "UserSourceFollow_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;
