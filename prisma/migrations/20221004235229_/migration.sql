/*
  Warnings:

  - The `date` column on the `Dine` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `type` to the `Dine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dine" ADD COLUMN     "type" "DINEHOURS" NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
