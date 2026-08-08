export type Profile = {
  id: string;
  full_name: string;
  headline: string;
  bio: string;
  profile_image: string | null;
  email: string;
  phone: string | null;
  location: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  whatsapp_url: string | null;
  updated_at?: string;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string | null;
  description: string | null;
  start_year: number | null;
  end_year: number | null;
  current: boolean;
  location: string | null;
  sort_order: number;
};

export type Experience = {
  id: string;
  organization: string;
  position: string;
  department: string | null;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  current: boolean;
  location: string | null;
  sort_order: number;
};

export type Skill = {
  id: string;
  category: string;
  name: string;
  level: number | null;
  icon: string | null;
  sort_order: number;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  category: string;
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  technologies: string[];
  featured: boolean;
  sort_order: number;
};

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  enabled: boolean;
  sort_order: number;
};

export type SiteSettings = {
  id: string;
  site_title: string;
  site_description: string;
  primary_color: string | null;
  accent_color: string | null;
  favicon_url: string | null;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
};
