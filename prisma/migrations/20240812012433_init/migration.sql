-- CreateTable
CREATE TABLE "UserWaiting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "timeCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "UserWaiting_email_key" ON "UserWaiting"("email");
