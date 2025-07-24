# Real Estate Agents Dashboard

A modern, responsive dashboard for managing Iraqi real estate agencies, properties, and business operations.

## ✨ Features

### 🏢 **Agency Management**
- **Dashboard Overview**: Stats cards showing total agencies, active agencies, pending approvals, and revenue
- **Agent Profiles**: Detailed agent information with contact details, properties count, and performance metrics
- **Table & Card Views**: Switch between table and card layouts for agent listings
- **Advanced Filtering**: Filter by status, search by name/phone, and date range filtering
- **CRUD Operations**: Create, read, update, and delete agent records

### 🏠 **Property Management**
- **Properties by Agent**: View all properties managed by specific agents
- **Property Details**: Images, specifications, pricing, and status tracking
- **Property Types**: Support for apartments, houses, villas, offices, shops, and land
- **Status Tracking**: Available, sold, rented, and pending status management

### 🌐 **Multi-language Support**
- **English & Arabic**: Full RTL (Right-to-Left) support for Arabic
- **Internationalization**: All UI text is translatable
- **Regional Focus**: Optimized for Iraqi real estate market

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme Ready**: Built with theme support
- **Skeleton Loading**: Beautiful loading states that match actual content
- **Interactive Components**: Dropdowns, modals, and data tables

### ⚡ **Performance & Reliability**
- **Smart Caching**: TanStack Query for intelligent data caching
- **Optimistic Updates**: Instant UI updates with background sync
- **Auto-retry**: Failed requests automatically retry with exponential backoff
- **Type Safety**: Full TypeScript support for robust development

## 🛠️ Tech Stack

### **Frontend Framework**
- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### **UI & Styling**
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui Components** - High-quality, accessible UI components via Reka UI
- **Lucide Vue Next** - Beautiful icons
- **Class Variance Authority** - Component variant management

### **State Management & Data**
- **TanStack Vue Query** - Powerful data synchronization and caching
- **Vue Router** - Client-side routing
- **VueUse** - Collection of Vue composition utilities

### **Development & Testing**
- **Vitest** - Unit testing framework
- **Vue Test Utils** - Vue component testing utilities
- **Vue TSC** - TypeScript compiler for Vue
- **PNPM** - Fast, disk space efficient package manager

### **Deployment**
- **Docker** - Containerized deployment
- **Nginx** - Web server with SPA routing support
- **Docker Compose** - Multi-container orchestration

## 📦 Key Packages

```json
{
  "dependencies": {
    "vue": "^3.5.17",
    "@tanstack/vue-query": "^5.83.0",
    "@tanstack/vue-table": "^8.21.3",
    "vue-router": "^4.5.1",
    "vue-i18n": "^9.14.5",
    "tailwindcss": "^4.1.11",
    "reka-ui": "^2.4.0",
    "lucide-vue-next": "^0.525.0",
    "@vueuse/core": "^13.5.0"
  }
}
```

## 🚀 How to Run

### **Prerequisites**
- Node.js 18+ 
- PNPM (recommended) or npm
- Docker (for containerized deployment)

### **Development Setup**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-estate-agents-dashboard
   ```

2. **Install dependencies**
   ```bash
   cd app
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```
   
   The app will be available at `http://localhost:5173`

4. **Run tests**
   ```bash
   pnpm test:unit
   ```

5. **Type checking**
   ```bash
   pnpm type-check
   ```

### **Production Build**

1. **Build the application**
   ```bash
   pnpm build
   ```

2. **Preview production build**
   ```bash
   pnpm preview
   ```

### **Docker Deployment**

1. **Build and run with Docker Compose**
   ```bash
   docker compose up --build
   ```
   
   The app will be available at `http://localhost:8080`

2. **Run in background**
   ```bash
   docker compose up -d
   ```

3. **Stop containers**
   ```bash
   docker compose down
   ```

### **Available Scripts**

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test:unit` - Run unit tests
- `pnpm type-check` - Run TypeScript type checking

## 🗂️ Project Structure

```
app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── agents/         # Agent-specific components
│   │   ├── properties/     # Property-specific components
│   │   └── layout/         # Layout components
│   ├── pages/              # Page components
│   ├── composables/        # Vue composition functions
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   ├── i18n/               # Internationalization
│   ├── assets/             # Static assets and data
│   └── lib/                # Utility libraries
├── public/                 # Public static files
├── __tests__/              # Test files
└── docker files           # Docker configuration
```

## 🌟 Key Features in Detail

- **🔄 Smart Caching**: Data cached for 5 minutes, instant loading on revisits
- **📱 Mobile-First**: Responsive design that works on all devices  
- **🌍 RTL Support**: Complete Arabic language support with RTL layout
- **⚡ Optimistic UI**: Updates happen instantly while syncing in background
- **🛡️ Type Safety**: Full TypeScript coverage for reliable development
- **🧪 Well Tested**: Comprehensive test suite for components and services
- **🐳 Docker Ready**: One-command deployment with Docker Compose

---
