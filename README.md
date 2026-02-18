# Tax Collection Web Application

A modern, responsive Tax Collection Web Application Dashboard built with Next.js, React, Tailwind CSS, and shadcn/ui. Designed for India-based tax collection (GST / Property / Local Tax).

## Features

### Authentication System
- Email/Phone login with OTP support
- Role-based access control (Admin, Staff, User)
- Secure signup with OTP verification

### Dashboard
- **Admin Dashboard**: Complete overview with total tax collected, pending payments, monthly revenue charts, and recent transactions
- **Staff Dashboard**: Collection overview and assigned taxpayers
- **User Dashboard**: Personal tax payment overview and quick actions

### Tax Management
- Add/Edit/Delete taxpayers
- Tax calculation and tracking
- Due date tracking
- Penalty calculation support

### Payment System
- Multiple payment methods (UPI, Card, Net Banking)
- Payment status tracking (Success / Pending / Failed)
- PDF receipt download functionality

### Reports & Analytics
- Monthly/Yearly reports
- Export to Excel/PDF
- Filter by date and user
- Revenue charts and visualizations

### Notifications
- Email/SMS reminder system
- Due alerts for taxpayers
- Custom notification messages

### Security & Settings
- Change password functionality
- Two-factor authentication toggle
- Session management
- Profile settings

## Design

- Clean government-style professional UI
- Blue, white, and light gray color scheme
- Fully responsive and mobile-friendly
- Sidebar navigation with role-based menus
- Top navbar with profile menu
- Dark mode support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Charts**: Recharts
- **PDF Generation**: jsPDF
- **Excel Export**: xlsx
- **Icons**: Lucide React
- **Theme**: next-themes (dark mode)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── admin/          # Admin dashboard pages
│   ├── staff/          # Staff dashboard pages
│   ├── user/           # User dashboard pages
│   ├── login/          # Login page
│   ├── signup/         # Signup page
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/
│   ├── layout/         # Layout components (Sidebar, Navbar)
│   └── ui/             # shadcn/ui components
├── lib/
│   └── utils.ts        # Utility functions
└── hooks/
    └── use-toast.ts    # Toast notification hook
```

## Pages

### Authentication
- `/login` - Login page with email/phone and OTP
- `/signup` - Signup page with OTP verification

### Admin Pages
- `/admin` - Admin dashboard
- `/admin/taxpayers` - Taxpayer management
- `/admin/payments` - Payment transactions
- `/admin/reports` - Reports and analytics
- `/admin/notifications` - Send notifications
- `/admin/settings` - Admin settings

### Staff Pages
- `/staff` - Staff dashboard
- `/staff/taxpayers` - Assigned taxpayers
- `/staff/payments` - Payment transactions
- `/staff/reports` - Collection reports
- `/staff/settings` - Staff settings

### User Pages
- `/user` - User dashboard
- `/user/payments` - Make payments
- `/user/receipts` - View receipts
- `/user/settings` - User settings

## Features in Detail

### Role-Based Access
- **Admin**: Full access to all features including taxpayer management, reports, and notifications
- **Staff**: Limited access to assigned taxpayers and their own collections
- **User**: Access to personal dashboard, payments, and receipts

### Payment Methods
- UPI payment integration
- Credit/Debit card support
- Net Banking options

### Reports Export
- Excel export with transaction data
- PDF export with formatted reports
- Date range filtering
- Tax type filtering

## Development

The application uses:
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui for accessible components
- Recharts for data visualization
- jsPDF for PDF generation
- xlsx for Excel export

## License

This project is created for demonstration purposes.
