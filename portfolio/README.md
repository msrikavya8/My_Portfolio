# Sri Kavya Manne — Professional Developer Portfolio

A handcrafted, high-performance personal portfolio website designed for **Sri Kavya Manne** (Aspiring Software Engineer, Frontend Developer, and Data Analytics Enthusiast).

This portfolio is purposefully structured for recruiters, HR professionals, and technical interviewers evaluating candidates for fresher, SDE, and graduate software engineering roles.

---

## 🌟 Key Highlights & Design Philosophy

- **Handcrafted Aesthetic:** Avoids generic AI templates, excessive gradients, and redundant card components. Built with deep obsidian slate tones, subtle indigo/sky accents, and balanced whitespace.
- **Dark & Light Mode:** Seamless toggle with CSS custom properties and instant `localStorage` persistence.
- **Authentic Credentials:** Integrates Sri Kavya's actual photograph, verified educational credentials (B.Tech CSE 2027, CGPA 8.2), and real data analytics internship metrics from Trekverse Pvt. Ltd.
- **Zero Heavy Dependencies:** Built with pure HTML5, modern CSS3, and Vanilla JavaScript. No bulky frameworks or slow external CDN icon packs that could fail offline.
- **100% Mobile Responsive:** Tested across mobile screens (320px+), tablets, laptops, and ultra-wide desktops.
- **Accessibility (A11y):** Keyboard navigation support, focus management, ARIA attributes, semantic HTML elements, and `prefers-reduced-motion` compliance.

---

## 📂 File Structure

```text
portfolio/
│
├── index.html                  # Semantic structure & SEO-optimized markup
├── style.css                   # Custom responsive design system & themes
├── script.js                   # Navigation, theme toggle, modals & form logic
├── generate_placeholders.js    # Utility script to generate local fallback assets
├── README.md                   # Complete documentation & deployment guide
│
└── assets/
    ├── profile.jpg             # Sri Kavya's uploaded portrait photograph
    ├── resume.pdf              # Downloadable resume PDF
    ├── project1.png            # Team Collaboration Dashboard preview
    ├── project2.png            # Placement Preparation Portal preview
    │
    └── certificates/
        ├── cert-java.png       # Java Programming (CodeChef)
        ├── cert-sql.png        # SQL (Simplilearn)
        ├── cert-dbms.png       # Database Management Systems (NPTEL)
        ├── cert-web.png        # Web Development (NoviTech R&D Pvt. Ltd.)
        ├── cert-cloud.png      # Cloud Computing (NPTEL)
        └── cert-analytics.png  # Data Analytics (Trekverse)
```

---

## 🚀 How to Run Locally in Visual Studio Code

### Method 1: Using VS Code "Live Server" Extension (Recommended)
1. Open **Visual Studio Code**.
2. Click **File > Open Folder...** and select the `portfolio` folder:
   ```text
   c:\Users\M.Srikavya\Downloads\portfolio
   ```
3. If you don't already have it installed, press `Ctrl + Shift + X`, search for **Live Server** (by Ritwick Dey), and click **Install**.
4. Right-click `index.html` in the VS Code file explorer and click **"Open with Live Server"**.
5. Your browser will automatically open at `http://127.0.0.1:5500/index.html` with hot-reload enabled.

### Method 2: Using Built-in Node.js / npx
Since Node.js is already installed on your system:
1. Open the integrated terminal in VS Code (`Ctrl + \``).
2. Run:
   ```bash
   npx serve .
   ```
3. Open the provided `http://localhost:3000` link in your browser.

### Method 3: Direct Browser Launch
Double-click `index.html` in Windows File Explorer to open it directly in Google Chrome, Microsoft Edge, or Firefox.

---

## 🌐 How to Publish for Free on GitHub Pages

Publishing on GitHub Pages takes less than 3 minutes and gives you a free live URL (e.g., `https://msrikavya8.github.io/portfolio`):

### Step 1: Create a GitHub Repository
1. Log in to your GitHub account: [https://github.com/msrikavya8](https://github.com/msrikavya8).
2. Click the **+** (plus icon) in the top right corner and choose **New repository**.
3. Name your repository (e.g., `portfolio` or `msrikavya8.github.io`).
4. Set visibility to **Public** and leave "Initialize with README" unchecked.
5. Click **Create repository**.

### Step 2: Push your Portfolio Files to GitHub
Open your terminal inside `c:\Users\M.Srikavya\Downloads\portfolio` and run:

```bash
git init
git add .
git commit -m "Initial commit: Sri Kavya Manne Developer Portfolio"
git branch -M main
git remote add origin https://github.com/msrikavya8/portfolio.git
git push -u origin main
```
*(Replace `portfolio.git` with your exact repository name if different).*

### Step 3: Enable GitHub Pages
1. On your GitHub repository page, click the **Settings** tab.
2. In the left navigation menu, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/ (root)`.
4. Click **Save**.
5. Wait 1 to 2 minutes, and GitHub will provide your live URL at the top of the Pages settings:
   `https://msrikavya8.github.io/portfolio/`

---

## 📸 Asset Integration & Customization Guide

All assets are cleanly organized in the `assets/` directory so you can update them at any time:

### 1. Profile Photograph
- **Current status:** Configured with your uploaded photograph at `assets/profile.jpg`.
- **To update:** If you ever take a new professional headshot, name the file `profile.jpg` and replace the existing one in `assets/`.

### 2. Resume PDF
- **Current status:** `assets/resume.pdf` is initialized with your verified details (B.Tech CSE, 8.2 CGPA, skills, Trekverse internship, projects).
- **To update:** Export your formal resume from Word, Canva, or LaTeX as `resume.pdf` and replace `assets/resume.pdf`.

### 3. Project Screenshots & Repository Links
- **Project 1:** Team Collaboration Dashboard
  - Screenshot: Replace `assets/project1.png` with your actual project UI screenshot (recommended resolution: 1200×675 px or 16:9 ratio).
  - GitHub Link: In `index.html` (around line 340), change the `href` attribute from `https://github.com/msrikavya8` to your specific repository link:
    ```html
    <a href="https://github.com/msrikavya8/team-collaboration-dashboard" target="_blank" ...>
    ```
- **Project 2:** Placement Preparation Portal
  - Screenshot: Replace `assets/project2.png` with your portal screenshot.
  - GitHub Link: In `index.html` (around line 410), update the `href` attribute:
    ```html
    <a href="https://github.com/msrikavya8/placement-preparation-portal" target="_blank" ...>
    ```

### 4. Certificates
When you receive your official high-resolution certificate PDFs/images from each organization, save them as PNG or JPG in `assets/certificates/` using these exact names:
- `assets/certificates/cert-java.png` (CodeChef)
- `assets/certificates/cert-sql.png` (Simplilearn)
- `assets/certificates/cert-dbms.png` (NPTEL)
- `assets/certificates/cert-web.png` (NoviTech R&D)
- `assets/certificates/cert-cloud.png` (NPTEL)
- `assets/certificates/cert-analytics.png` (Trekverse)

The interactive certificate modal will instantly display your original files!

### 5. Contact Form Backend (Optional)
The contact form currently validates user inputs and generates a pre-formatted message in the user's default email client (`mailto:msrikavyachowdary064@gmail.com`).

If you want submissions sent directly to your email inbox without opening an email app:
1. Sign up for free at [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com).
2. Replace the `<form id="contactForm" ...>` action attribute with your Formspree endpoint URL:
   ```html
   <form id="contactForm" action="https://formspree.io/f/your-form-id" method="POST">
   ```

---

## 🛠️ Technology Stack
- **HTML5:** Semantic architecture, accessible landmarks, OpenGraph SEO tags.
- **CSS3:** Custom design tokens, Flexbox, CSS Grid, mobile media queries, smooth micro-interactions.
- **JavaScript (ES6+):** Vanilla script for ScrollSpy, accessible modal dialogs, real-time validation, and theme switching.

---

## 👩‍💻 Author
**Sri Kavya Manne**  
- Email: [msrikavyachowdary064@gmail.com](mailto:msrikavyachowdary064@gmail.com)  
- LinkedIn: [linkedin.com/in/sri-kavya](https://linkedin.com/in/sri-kavya)  
- GitHub: [github.com/msrikavya8](https://github.com/msrikavya8)  
- College: Ashoka Women's Engineering College, JNTUA (Class of 2027)
