# Deployment Guide — Qudurat Platform

## Prerequisites
- Node.js 20+
- PostgreSQL database (Neon, Supabase, Railway, or self-hosted)
- Stripe account
- Vercel account

---

## 1. Database Setup (Neon — recommended free tier)

1. Go to https://neon.tech → Create project → Copy connection string
2. Set `DATABASE_URL` in your environment

```bash
# Run migrations
npx prisma migrate dev --name init

# Seed sample questions
npm run db:seed
```

---

## 2. Stripe Setup

1. Create account at https://stripe.com
2. Go to **Products** → Create product "Qudurat Premium"
3. Add price: Recurring, 99 SAR / month
4. Copy the **Price ID** (e.g. `price_xxx`)
5. Go to **Developers → API Keys** → Copy Secret Key + Publishable Key
6. Set up Webhook:
   - Endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy **Webhook Secret**

---

## 3. Environment Variables

Create `.env` (never commit this file):

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/qudurat"

NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_ID="price_..."

NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

---

## 4. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect GitHub repo to Vercel dashboard and add env variables there.

**Important**: In Vercel dashboard → Settings → Environment Variables → add all variables above.

---

## 5. After Deployment

1. Run database migration in production:
```bash
DATABASE_URL="your-prod-url" npx prisma migrate deploy
```

2. Seed initial questions:
```bash
DATABASE_URL="your-prod-url" npm run db:seed
```

3. Update Stripe webhook URL to your production domain

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── packages/page.tsx           # Subscription page
│   ├── (auth)/
│   │   ├── login/page.tsx          # Login
│   │   └── register/page.tsx       # Register
│   ├── (dashboard)/
│   │   ├── dashboard/              # Main dashboard
│   │   ├── practice/[category]/    # Practice questions
│   │   └── exam/[year]/            # Timed exam
│   └── api/
│       ├── auth/[...nextauth]/     # NextAuth handler
│       ├── auth/register/          # Registration API
│       ├── stripe/create-checkout/ # Stripe checkout
│       ├── stripe/webhook/         # Stripe webhooks
│       ├── questions/              # Question bank API
│       └── progress/               # Progress API
├── components/
│   ├── ui/                         # Button, Card, Input, ProgressBar
│   └── layout/                     # Navbar, Footer
├── lib/
│   ├── auth.ts                     # NextAuth config
│   ├── prisma.ts                   # Prisma client
│   ├── stripe.ts                   # Stripe client
│   └── utils.ts                    # Utilities
└── middleware.ts                    # Route protection
```

## Adding More Questions

Edit `prisma/seed/index.ts` and add more question objects, then run `npm run db:seed`.

Or use Prisma Studio to add questions via GUI: `npm run db:studio`
