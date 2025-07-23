# TDP Factory - Deno Next.js Tailwind Project

A modern web application built with **Deno**, **Next.js 14**, and **Tailwind CSS**. This project showcases the power of combining these technologies for modern web development.

## 🚀 Features

- **Deno Runtime**: Secure, fast, and modern JavaScript/TypeScript runtime
- **Next.js 14**: Latest features with App Router and Server Components
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **TypeScript**: Full TypeScript support for better development experience
- **Responsive Design**: Mobile-first responsive design
- **Modern UI**: Beautiful, accessible, and performant user interface

## 🛠️ Tech Stack

- **Runtime**: Deno
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd TDPFactory
   ```

2. **Install Deno** (if not already installed):
   ```bash
   # macOS
   brew install deno
   
   # Windows
   choco install deno
   
   # Linux
   curl -fsSL https://deno.land/x/install/install.sh | sh
   ```

3. **Run the development server**:
   ```bash
   deno task dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 📝 Available Scripts

- `deno task dev` - Start the development server
- `deno task build` - Build the application for production
- `deno task start` - Start the production server

## 🏗️ Project Structure

```
TDPFactory/
├── app/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   └── Footer.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── deno.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Customization

### Tailwind Configuration

The project includes a custom Tailwind configuration with:
- Custom primary color palette
- Inter font family
- Custom component classes (`.btn-primary`, `.card`, etc.)

### Adding New Components

1. Create your component in `app/components/`
2. Import and use it in your pages
3. Use Tailwind classes for styling

### Styling Guidelines

- Use Tailwind utility classes for styling
- Create custom components for reusable UI elements
- Follow the established color scheme and typography
- Ensure responsive design for all components

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Deno](https://deno.land/) - Modern JavaScript/TypeScript runtime
- [Next.js](https://nextjs.org/) - React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Inter Font](https://rsms.me/inter/) - Beautiful typeface

---

Built with ❤️ using Deno, Next.js, and Tailwind CSS 