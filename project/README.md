# Sriram Travels Website

A professional multi-page website for Sriram Travels van service, built with vanilla HTML, CSS, and JavaScript.

## Features

- **Multi-page Navigation**: Home, Services, Gallery, and Contact pages
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Service Showcase**: Detailed information about local trips, marriage functions, and long-distance travel
- **Image Gallery**: Lightbox functionality for viewing van photos
- **Contact Form**: Validated contact form with service type selection
- **Payment QR Code**: Section for displaying payment QR code
- **Modern UI**: Clean, professional design with smooth animations

## File Structure

```
project/
├── index.html          # Home page with hero and services overview
├── services.html       # Detailed services page
├── gallery.html        # Image gallery with lightbox
├── contact.html        # Contact form and payment QR code
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
└── README.md           # This file
```

## Setup Instructions

1. **Download/Clone** all files to your local directory
2. **Open** `index.html` in a web browser
3. **No build process required** - works directly in the browser

## Customization

### Adding Your Images

1. **Gallery Images**: Replace placeholder images in `gallery.html` with your actual van photos
   - Update the `src` attribute in `<img>` tags within `.gallery-item` elements
   - Recommended size: 400x300px or larger (maintains aspect ratio)

2. **Payment QR Code**: Replace the placeholder QR code in `contact.html`
   - Update the `src` attribute of the image with `id="qrCodeImage"`
   - Recommended size: 300x300px
   - Supported formats: PNG, JPG, SVG

### Updating Contact Information

- **Phone Number**: Search for `9443970605` and replace with your number
- **Location**: Search for `Mavadi, Tirunelveli` and update as needed
- **Google Maps**: Update the iframe `src` in `contact.html` with your actual location coordinates

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2c5aa0;    /* Main brand color */
    --secondary-color: #4a90e2;   /* Secondary color */
    --accent-color: #50c878;      /* Accent/CTA color */
}
```

### Form Submission

The contact form currently uses `mailto:` links. To use a form submission service:

1. Sign up for a service like Formspree, Netlify Forms, or EmailJS
2. Update the `submitForm()` function in `script.js`
3. Replace the `mailto:` link with your form submission endpoint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Breakdown

### Navigation
- Sticky header that stays visible while scrolling
- Mobile-responsive hamburger menu
- Active page highlighting

### Home Page
- Hero section with call-to-action buttons
- Services overview cards
- Quick contact information

### Services Page
- Detailed service descriptions
- Feature lists for each service
- "Why Choose Us" section

### Gallery Page
- Responsive image grid
- Lightbox modal for full-size viewing
- Keyboard navigation (arrow keys, Escape)

### Contact Page
- Validated contact form
- Google Maps integration
- Payment QR code section
- Click-to-call phone number

## Notes

- All images use placeholder URLs - replace with your actual images
- The Google Maps embed uses placeholder coordinates - update with your location
- Form submission uses mailto: - consider integrating a form service for production
- Payment QR code is a placeholder - add your actual QR code image

## License

This website is created for Sriram Travels. All rights reserved.

