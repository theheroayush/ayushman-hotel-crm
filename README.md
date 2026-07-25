# 🏨 Ayushmaan OS v2 — The Hotel Operating System for Indian Hotels

> **"The easiest Hotel Operating System for Indian hotels."**  
> *Not a CRM. Not an ERP. An Operating System.*

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19.0-indigo.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)

---

## 📖 Table of Contents
- [🌟 Vision & Philosophy](#-vision--philosophy)
- [✨ Key Features Overview](#-key-features-overview)
- [🎯 Design Principles](#-design-principles)
- [👥 Roles & Granular Staff Scopes](#-roles--granular-staff-scopes)
- [💳 Real Merchant UPI Payment Engine](#-real-merchant-upi-payment-engine)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project File Structure](#-project-file-structure)
- [🚀 Quick Start for Non-Technical Users](#-quick-start-for-non-technical-users)
- [💻 Technical Installation & Developer Setup](#-technical-installation--developer-setup)
- [☁️ Cloud Deployment Guide (Vercel, Netlify, Docker)](#️-cloud-deployment-guide-vercel-netlify-docker)
- [⚙️ Hotel Configuration & Settings](#️-hotel-configuration--settings)
- [📄 License & Credits](#-license--credits)

---

## 🌟 Vision & Philosophy

Most hotel software forces receptionists, managers, and housekeepers to navigate dozens of cluttered tables, nested menus, and confusing forms. 

**Ayushmaan OS v2** redesigns hotel software from the ground up:
- **Operations First**: Reception staff never have to leave the **Front Desk Workspace**.
- **No Tables for Rooms**: A visual, color-coded **Visual Room Board** replaces old data tables.
- **30-Second Booking**: Walk-in guest check-in takes less than 30 seconds with automatic phone lookup and dynamic UPI payment QR codes.
- **WhatsApp Native**: Guest confirmation vouchers, invoices, and location pins are dispatched directly via WhatsApp (`wa.me`).

---

## ✨ Key Features Overview

| Module | Features & Capabilities |
| :--- | :--- |
| **🏢 Front Desk Workspace** | Heart of the OS. Live operational counters (Check-ins, Check-outs, Walk-ins, Pending Payments, VIP Guests, Cleaning alerts) + 6 instant quick actions. |
| **🖼️ Visual Rooms Board** | Card-based room status board showing Occupied, Cleaning (with timer), Vacant (1-click book), and Maintenance rooms. |
| **⚡ 30s Quick Booking** | 3-step booking wizard with auto-guest profile lookup via phone number + dynamic Merchant UPI QR generation. |
| **👤 Guest 360° Profile** | Complete guest lifetime value (LTV), visit count, preferred room category, Aadhaar verification status, staff notes, and stay timeline. |
| **💳 Finance & UPI Cockpit** | Today's revenue breakdown (UPI vs Cash vs Card), outstanding collections, and 1-click official Indian GST Tax Invoices (SAC 996311). |
| **🧹 Housekeeping Kanban** | Real-time 4-column drag/click Kanban board (`Dirty` → `Cleaning` → `Inspection` → `Ready`) with mobile staff view. |
| **👑 Owner Intelligence** | Executive cockpit displaying **RevPAR** (Revenue Per Available Room), **ADR** (Average Daily Rate), room category fill rates, and low fill-rate alerts. |
| **🔑 Admin Staff Scopes** | Granular permission scope controller (`SCOPE_FRONT_DESK_WRITE`, `SCOPE_COLLECT_PAYMENT`, etc.) with 4-digit PIN login. |
| **📱 WhatsApp Simulator** | Interactive phone drawer demonstrating automated guest messaging (confirmation, UPI QR link, location pin, review request). |

---

## 🎯 Design Principles

Every screen in Ayushmaan OS adheres to strict operational rules:
1. **3 Clicks Maximum**: Any action (booking, check-out, bill generation, room assignment) completes in 3 clicks or fewer.
2. **One Primary Action Per Screen**: Uncluttered focus on what matters right now.
3. **Works Without Training**: Simple enough for any hotel staff member to use on day one.
4. **Keyboard Shortcuts Everywhere**: Press `⌘K` or `Ctrl+K` anywhere for instant AI command search.
5. **Fast & Lightweight**: Sub-300ms page load times on low-end laptops and mobile phones.
6. **UPI & WhatsApp First**: Native support for Indian payment VPAs (`upi://pay`) and WhatsApp messaging.

---

## 👥 Roles & Granular Staff Scopes

Ayushmaan OS features a **Staff Permission & Scope Control System**:

### Pre-Configured Default Hotel Roles
- 🧹 **Housekeeper**: Granted `SCOPE_HOUSEKEEPING_ONLY` (Mobile cleaner task checklist; cannot see financial ledgers or guest CRM).
- 🛎️ **Receptionist**: Granted `SCOPE_FRONT_DESK_READ`, `SCOPE_FRONT_DESK_WRITE`, `SCOPE_COLLECT_PAYMENT` (Can process walk-ins, check in/out, collect payments).
- 💰 **Finance Accountant**: Granted `SCOPE_VIEW_FINANCE`, `SCOPE_COLLECT_PAYMENT` (Can view daily revenue, GST invoices, and export Tally data).
- 💼 **Hotel Manager**: Operational scopes + Housekeeping + Guest CRM + Tariff Overrides.
- 👑 **Admin / Owner**: Granted `SCOPE_ADMIN_ALL` (Full access including staff scope management, RevPAR analytics, and system resets).

### 🔑 Default Test Staff PINs
- **Housekeeper PIN**: `1111`
- **Receptionist PIN**: `2222`
- **Admin / Owner PIN**: `9999`

---

## 💳 Real Merchant UPI Payment Engine

Ayushmaan OS includes an authentic UPI Payment URI Generator.

When a guest pays via UPI, the system formats a compliant string:
```text
upi://pay?pa=grandheritage@upi&pn=Grand+Heritage+Inn&am=3500&tn=AYU-8819&cu=INR
```
Scanning the QR code using **Google Pay**, **PhonePe**, **Paytm**, or **BHIM** automatically launches the payment transfer directly to the hotel's bank account.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript 5.7](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling & Design**: [Tailwind CSS v4](https://tailwindcss.com/) + Glassmorphism + Inter Typography
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Persistence**: Custom `useHotelStore` hook synchronized to browser `localStorage`

---

## 📁 Project File Structure

```
ayushmaan-os-v2/
├── index.html                  # Main HTML entry point
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript master configuration
├── vite.config.ts              # Vite + Tailwind plugin configuration
├── public/                     # Static icons & assets
└── src/
    ├── main.tsx                # React application entry point
    ├── App.tsx                 # Root application component & routing
    ├── index.css               # Design system tokens & Tailwind imports
    ├── assets/                 # Image assets
    ├── data/
    │   └── mockData.ts         # Initial sample rooms, guests, transactions data
    ├── types/
    │   ├── hotel.ts            # Core data models (Room, Guest, Transaction, HotelConfig)
    │   └── scopes.ts           # Permission scope definitions & role templates
    ├── hooks/
    │   └── useHotelStore.ts    # Persistent LocalStorage state store
    ├── components/
    │   ├── admin/
    │   │   ├── AdminStaffScopePanel.tsx  # Admin panel for staff scopes & PINs
    │   │   └── StaffLoginModal.tsx       # 4-Digit Staff PIN Keypad Login
    │   ├── payment/
    │   │   └── RealUPIQRCode.tsx         # Real upi://pay URI & QR Code generator
    │   ├── booking/
    │   │   └── BookingVoucherModal.tsx   # Digital Confirmation Voucher Pass
    │   ├── finance/
    │   │   └── GSTInvoiceModal.tsx       # Official Indian GST Tax Invoice (SAC 996311)
    │   ├── layout/
    │   │   ├── RoleSwitcher.tsx          # Active Role Selector Bar
    │   │   ├── ShareAccessModal.tsx      # Staff/Guest Access Link & QR Generator
    │   │   └── Sidebar.tsx               # Navigation Sidebar
    │   ├── modules/
    │   │   ├── FrontDeskModule.tsx       # Operational Workspace & Quick Actions
    │   │   ├── VisualRoomsBoard.tsx      # Card-based Room Board (No tables)
    │   │   ├── QuickBookingModal.tsx     # 30s Quick Booking & UPI Wizard
    │   │   ├── GuestTimeline.tsx         # Guest 360° Lifetime Value & History
    │   │   ├── FinanceModule.tsx         # Revenue ledgers & Merchant UPI Config
    │   │   ├── HousekeepingKanban.tsx    # 4-stage Housekeeping Kanban
    │   │   ├── OwnerAnalyticsModule.tsx  # RevPAR, ADR, Category Fill Rates
    │   │   ├── CleanerMobileModule.tsx   # Simplified Mobile Cleaner Checklist
    │   │   └── AIAssistantModule.tsx     # AI Reception Copilot
    │   ├── ai/
    │   │   └── AICommandBar.tsx          # ⌘K Raycast-style search bar
    │   └── whatsapp/
    │       └── WhatsAppSimulator.tsx     # Interactive WhatsApp Guest Auto-bot
```

---

## 🚀 Quick Start for Non-Technical Users

If you are a hotel owner or manager wanting to run Ayushmaan OS without writing code:

### Step 1: Install Node.js
Download and install **Node.js** (v18 or higher) from [nodejs.org](https://nodejs.org/).

### Step 2: Open Terminal / Command Prompt
On Windows, press `Win + R`, type `cmd`, and press Enter.

### Step 3: Copy-Paste These Commands
Copy and paste the following commands into your terminal:

```bash
# 1. Clone the repository
git clone https://github.com/theheroayush/ayushman-hotel-crm.git

# 2. Go into the project directory
cd ayushman-hotel-crm

# 3. Install dependencies
npm install

# 4. Start Ayushmaan OS locally
npm run dev
```

### Step 4: Open in Browser
Open your Web Browser (Chrome, Edge, Safari) and navigate to:
```text
http://localhost:3000/
```
Ayushmaan OS is now running live on your computer! 🎉

---

## 💻 Technical Installation & Developer Setup

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/theheroayush/ayushman-hotel-crm.git
cd ayushman-hotel-crm

# Install project dependencies
npm install

# Run Vite development server
npm run dev
```

### Building for Production

To compile a highly optimized static build:

```bash
npm run build
```
The output files will be generated inside the `dist/` directory.

### Preview Production Build Locally

```bash
npm run preview
```

---

## ☁️ Cloud Deployment Guide (Vercel, Netlify, Docker)

Ayushmaan OS v2 compiles to static HTML/JS/CSS, making it free to host on cloud platforms!

### Option A: Deploy to Vercel (Recommended — 1-Click)

1. Fork or push this repository to your GitHub account.
2. Sign up / Log in to [Vercel](https://vercel.com/).
3. Click **"New Project"** and select `ayushman-hotel-crm`.
4. Vercel automatically detects Vite. Click **"Deploy"**.
5. Your hotel OS is now live at `https://your-hotel-name.vercel.app`!

---

### Option B: Deploy to Netlify

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

---

### Option C: Docker Deployment

Create a `Dockerfile` in the root folder:

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run the Docker container:

```bash
# Build Docker image
docker build -t ayushmaan-os .

# Run container on port 80
docker run -d -p 80:80 --name hotel-os ayushmaan-os
```

---

## ⚙️ Hotel Configuration & Settings

To set up your hotel's official credentials:

1. Open Ayushmaan OS in your browser.
2. Navigate to **Finance & UPI** or **Settings**.
3. Update:
   - **Hotel Legal Name**: e.g., `Grand Heritage Inn Pvt Ltd`
   - **Merchant UPI VPA**: e.g., `grandheritage@upi` or `9876543210@paytm`
   - **GSTIN**: e.g., `27AABCG1234H1Z5`
4. Click **Save VPA**. All newly generated payment QR codes will automatically route to your bank account!

---

## 📄 License & Credits

Designed & Built with ❤️ for Indian Hotels by **Ayush** & the Ayushmaan OS Team.

Licensed under the [MIT License](LICENSE) — free for personal, commercial, and enterprise hotel use.
