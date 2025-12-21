# Lamfuz - Authentic Nepali Restaurant

Lamfuz is a modern, responsive website for an authentic Nepali restaurant based in Copenhagen, Denmark. The site is built with performance, SEO, and user experience in mind, featuring a multi-language interface (English/Danish) and a sleek, mobile-first design.

## 🚀 Work Completed So Far

### 1. Modern Gallery Slideshow
- Replaced the static image grid with a high-performance **Gallery Slider**.
- Implemented **CSS Scroll Snap** for smooth, native-feeling transitions on touch devices.
- Added **Auto-play** functionality with pause-on-interaction logic.
- Integrated **Responsive Images (`srcset`)** to serve optimized image sizes (Small, Medium, Large) based on the user's screen, improving load times and saving data.

### 2. Mobile & UI Optimization
- **Footer Alignment**: Fixed mobile layout issues where underlines and links were not centered.
- **Responsive Navigation**: Implemented a clean hamburger menu for mobile users.
- **Vite Optimization**: Cleaned up asset paths to work seamlessly with the Vite build tool, resolving console warnings and ensuring fast development reloads.

### 3. SEO & Structured Data
- **Meta Tags**: Fully configured Primary, Open Graph, and Twitter meta tags for social sharing.
- **JSON-LD**: Added Schema.org `Restaurant` structured data to help Google understand the business type, location, and menu, which improves search ranking.
- **Multi-language**: Built-in support for English (EN) and Danish (DA) with a persistent language switcher.

---

## 📋 Next Steps for the Business Owner

To get the site ready for launch, the following items need to be updated with real business data:

### 1. Update Contact Information
Search for `XXXX` or `info@lamfuz.com` in the following files and replace them with your actual details:
- `index.html` (Check the `<script type="application/ld+json">` section and the footer).
- `contact.html` (Update the address, phone, and email).

### 2. Connect the Booking System
- Currently, the "Book a Table" buttons scroll to a reservation section or point to an email.
- If you use a service like **DinnerBooking**, **Formitable**, or **ResDiary**, you should replace the button links with your unique booking URL.

### 3. Review Menu & Pricing
- Open `menu.html` and the "Our Menu" section in `index.html`.
- Verify that all dishes, descriptions, and prices (DKK) are accurate.

### 4. Social Media Links
- Update the footer links in `index.html`, `about.html`, `menu.html`, and `contact.html` to point to your official Facebook and Instagram pages.

### 5. Deployment
- The project is ready to be hosted on platforms like **Vercel**, **Netlify**, or **GitHub Pages**.
- Simply connect your GitHub repository to one of these services, and it will automatically build and deploy your site.

### 6. Analytics (Optional)
- If you want to track visitors, you should add your **Google Analytics** or **Facebook Pixel** code to the `<head>` section of all HTML files.

---

## 🛠 Technical Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```