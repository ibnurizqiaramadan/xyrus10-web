import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// --- AUTH TABLES ---
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
});

// --- CONTENT TABLES ---

export const hero = sqliteTable("hero", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  titleId: text("title_id").notNull(),
  titleEn: text("title_en").notNull(),
  descriptionId: text("description_id").notNull(), // Quill content
  descriptionEn: text("description_en").notNull(), // Quill content
  imageUrl: text("image_url"),
});

export const about = sqliteTable("about", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titleId: text("title_id").notNull(),
  titleEn: text("title_en").notNull(),
  bio1Id: text("bio1_id").notNull(),
  bio1En: text("bio1_en").notNull(),
  bio2Id: text("bio2_id").notNull(),
  bio2En: text("bio2_en").notNull(),
  bio3Id: text("bio3_id").notNull(),
  bio3En: text("bio3_en").notNull(),
  skills: text("skills").notNull(), // JSON string array
});

export const experiences = sqliteTable("experiences", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  company: text("company").notNull(),
  roleId: text("role_id").notNull(),
  roleEn: text("role_en").notNull(),
  location: text("location").notNull(),
  periodId: text("period_id").notNull(),
  periodEn: text("period_en").notNull(),
  achievementsId: text("achievements_id").notNull(), // JSON string array
  achievementsEn: text("achievements_en").notNull(), // JSON string array
  displayOrder: integer("display_order").notNull().default(0),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  descriptionId: text("description_id").notNull(),
  descriptionEn: text("description_en").notNull(),
  techStack: text("tech_stack").notNull(), // JSON string array
  githubUrl: text("github_url"),
  demoUrl: text("demo_url"),
  imageUrl: text("image_url"),
  displayOrder: integer("display_order").notNull().default(0),
});

export const contact = sqliteTable("contact", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  locationId: text("location_id").notNull(),
  locationEn: text("location_en").notNull(),
});

export const socialLinks = sqliteTable("social_links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  href: text("href").notNull(),
  icon: text("icon").notNull(), // lucide icon name or similar
});
