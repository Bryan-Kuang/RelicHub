# Antique E-commerce Website

A bilingual (Chinese/English) e-commerce website for antique items with user and admin interfaces.

## Features

- **Bilingual Support**: Full Chinese and English language support
- **User Interface**:
  - Search products by name or meaning
  - Random product recommendations
  - Product detail pages with meaning descriptions
  - Direct links to Amazon for purchasing
- **Admin Interface**:
  - Secure login with phone number SMS verification
  - Product management (add/edit/delete)
  - Admin user management
  - Role-based permissions (regular admin vs super admin)

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: Ant Design
- **Authentication**: Firebase Authentication (Phone)
- **Database**: Firebase Firestore
- **Internationalization**: i18next
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/antique-ecommerce.git
   cd antique-ecommerce
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Phone provider
   - Create a Firestore database
   - Get your Firebase configuration
   - Update `.env.local` with your Firebase configuration

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Setting up Admin Access

You can set up the initial admin user and sample products using the provided initialization script:

1. First, make sure you've set up your Firebase project and updated the `.env.local` file with your Firebase configuration.

2. Run the initialization script with your phone number:

   ```bash
   npm run init-firebase +1234567890
   ```

   Replace `+1234567890` with your actual phone number in E.164 format.

3. This script will:
   - Create a superadmin user with your phone number
   - Add sample products to the database

## Deployment to Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

3. Login to Vercel:

   ```bash
   vercel login
   ```

4. Deploy the project:

   ```bash
   vercel
   ```

5. Set up environment variables in the Vercel dashboard:
   - Go to your project settings
   - Add all the Firebase environment variables from `.env.local`

## Project Structure

- `/src/app`: Next.js app router pages
- `/src/components`: React components
  - `/layout`: Layout components
  - `/user`: User interface components
  - `/admin`: Admin interface components
- `/src/lib`: Utility functions and configurations
  - `/firebase`: Firebase configuration and utilities
  - `/i18n`: Internationalization configuration
- `/public`: Static assets

## License

This project is licensed under the MIT License - see the LICENSE file for details.
