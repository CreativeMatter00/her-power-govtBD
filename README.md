<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
#   h e r - p o w e r 
 
  -->

# UMCH EMR Frontend

## Overview

Her Power is a **Next.js-based** application. This project is targeted towards female entrepreneurs and their businness

---

## Getting Started

First, to install the project, run the following command:

```bash
npm install
# or
yarn install
```

Then, to run the development server, run the following command:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Framework and Libraries

| **Category**         | **Details**                 |
| -------------------- | --------------------------- |
| **Framework**        | Next.js: `v14.2.3`          |
| **Base Library**     | React: `v18`                |
| **Styling**          | Tailwind CSS                |
| **Utilities**        | React Icons, React Toastify |
| **API Handling**     | Axios, TanStack React Query |
| **Form Management**  | React Hook Form             |
| **Validation**       | Yup                         |
| **Translation Tool** | next-intl                   |

---

## 🌐 URLs

| **Purpose**    | **URL**                                                                              |
| -------------- | ------------------------------------------------------------------------------------ |
| **GitLab**     | [http://192.168.0.164/uiux/her-power](http://192.168.0.164/uiux/her-power)           |
| **API**        | [http://163.47.146.233:3010/her-power-api](http://163.47.146.233:3010/her-power-api) |
| **Local Live** | [http://192.168.0.3:4008/en](http://192.168.0.3:4008/en)                             |
| **Live Link**  | [https://portal.creativeati.xyz/en](https://portal.creativeati.xyz/en)               |

**Client:** ICT Ministry

---

## 🛠️ MODULES

- **Shop Now:** Ecommerce Service
- **Explore Courses:** Publishing and enrolling in courses
- **Career & Placement:** Posting jobs and freelance Services
- **Events:** Posting and Participating in events
- **Meet Up:** Posting blogs and comments
- **Resource Lirbrary:** Posting articles, documents and videos

---

## Module Paths

- **Admin:** /src/app/[locale]/(admin)/admin
- **Shop Now:** /src/app/[locale]/(main)/(shop-now)/shop-now
- **Explore Courses:** /src/app/[locale]/(others)/course
- **Career & Placement:** /src/app/[locale]/(others)/career
- **Events:** /src/app/[locale]/(others)/event
- **Latest News:** /src/app/[locale]/(others)/latest-news
- **Meet Up:**
- **Resource Lirbrary:**

## 👤 User Types

1. Admin
2. Basic user /e-commerce customer / event participant / blog writer
3. e-commerce seller
4. Course Provider
5. Course Seller
6. Job Provider
7. Job Seeker
8. Event Organizer

---

## API

All the api calls are done in the following location:
/src/api/api.ts
