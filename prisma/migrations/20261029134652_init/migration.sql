-- CreateEnum
CREATE TYPE "roadmap_kind" AS ENUM ('EDUCATION', 'WORK');

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "alt_text" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "landing_page" (
    "id" SERIAL NOT NULL,
    "welcome_text" TEXT NOT NULL,
    "photo_id" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "landing_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_stack_items" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "icon" VARCHAR(60) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "tech_stack_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_sections" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "photo_id" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience_sections" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experience_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmap_items" (
    "id" SERIAL NOT NULL,
    "kind" "roadmap_kind" NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "roadmap_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(160) NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "role" VARCHAR(120),
    "start_date" DATE,
    "end_date" DATE,
    "cover_photo_id" INTEGER,
    "github_url" VARCHAR(300),
    "live_url" VARCHAR(300),
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_images" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "media_id" INTEGER NOT NULL,
    "caption" VARCHAR(200),
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "project_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_tech" (
    "project_id" INTEGER NOT NULL,
    "tech_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "project_tech_pkey" PRIMARY KEY ("project_id","tech_id")
);

-- CreateIndex
CREATE INDEX "roadmap_items_kind_order_idx" ON "roadmap_items"("kind", "order");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_is_published_order_idx" ON "projects"("is_published", "order");

-- CreateIndex
CREATE INDEX "project_images_project_id_order_idx" ON "project_images"("project_id", "order");

-- CreateIndex
CREATE INDEX "project_tech_project_id_order_idx" ON "project_tech"("project_id", "order");

-- AddForeignKey
ALTER TABLE "landing_page" ADD CONSTRAINT "landing_page_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "about_sections" ADD CONSTRAINT "about_sections_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_photo_id_fkey" FOREIGN KEY ("cover_photo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tech" ADD CONSTRAINT "project_tech_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_tech" ADD CONSTRAINT "project_tech_tech_id_fkey" FOREIGN KEY ("tech_id") REFERENCES "tech_stack_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
