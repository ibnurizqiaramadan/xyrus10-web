import { hero, about, experiences, projects, contact, siteSettings } from "./db/schema";

export type Hero = typeof hero.$inferSelect;
export type HeroInsert = typeof hero.$inferInsert;

export type About = typeof about.$inferSelect;
export type AboutInsert = typeof about.$inferInsert;

export type Experience = typeof experiences.$inferSelect;
export type ExperienceInsert = typeof experiences.$inferInsert;

export type Project = typeof projects.$inferSelect;
export type ProjectInsert = typeof projects.$inferInsert;

export type Contact = typeof contact.$inferSelect;
export type ContactInsert = typeof contact.$inferInsert;

export type SiteSetting = typeof siteSettings.$inferSelect;
export type SiteSettingInsert = typeof siteSettings.$inferInsert;
