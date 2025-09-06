# Kandid
# 🚀 Linkbird.ai UI – Leads & Campaigns  

This project implements the **Leads** and **Campaigns** sections of the [Linkbird.ai]platform with authentication, infinite scroll tables, detailed side sheets, and a responsive dashboard layout.  

---

## 📂 Project Structure  

```bash
.
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Authentication pages (login, register, Google OAuth)
│   ├── (dashboard)/            # Protected dashboard layout
│   │   ├── leads/              # Leads section
│   │   │   ├── components/     # Leads UI components
│   │   │   └── page.tsx        # Leads page
│   │   ├── campaigns/          # Campaigns section
│   │   │   ├── components/     # Campaigns UI components
│   │   │   └── page.tsx        # Campaigns page
│   │   ├── settings/           # Settings page
│   │   └── layout.tsx          # Dashboard shell with sidebar + header
│   └── api/                    # Server actions & API routes
│
├── components/                 # Shared UI components
│   ├── ui/                     # shadcn/ui wrapped components
│   ├── sidebar/                # Sidebar navigation
│   ├── auth-dialog/            # Authentication dialog
│   └── table/                  # Reusable table components
│
├── db/                         # Database config & schema
│   ├── schema/                 # Drizzle ORM schema
│   └── index.ts                # Database connection
│
├── lib/                        # Utilities & helpers
│   ├── auth.ts                 # Better Auth config
│   ├── zustand-store.ts        # Zustand global state
│   └── query-client.ts         # TanStack Query setup
│
├── public/                     # Static assets
├── styles/                     # Tailwind global styles
├── README.md                   # Project documentation
├── drizzle.config.ts           # Drizzle ORM config
├── package.json

Tech Stack

Framework: Next.js 15+ (App Router + Server Actions)
Styling: Tailwind CSS + shadcn/ui
Database: PostgreSQL + Drizzle ORM
Authentication: Better Auth (Credentials + Google OAuth)

State Management:
Zustand → Client-side states (sidebar, filters, modals)
TanStack Query → Server state, caching, infinite scroll

Deployment: Vercel
└── tsconfig.json

Features
Authentication
Email/password registration
Google OAuth login
Session persistence
Protected routes (redirect unauthenticated users)

Layout & Navigation
Responsive sidebar with collapse/expand
Active link highlighting
User profile + logout menu
Breadcrumb navigation in header

Leads Section
Infinite scrolling leads table
Columns: Name, Email, Company, Campaign, Status, Last Contact
Search + filter functionality
Detailed side sheet with:
Contact info
Campaign details
Interaction history
Status update actions

Campaigns Section
Campaigns table with sortable columns
Columns: Name, Status, Leads, Success Rate, Progress, Created Date
Filters for campaign status
Progress bars + statistics cards
CRUD actions: Edit, Pause/Resume, Delete


