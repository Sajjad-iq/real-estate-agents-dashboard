# Real Estate Agents Management Dashboard

A modern, responsive dashboard for managing real estate agents built with Vue.js 3, TypeScript, and shadcn/ui components.

## 🚀 Features

### 📊 Dashboard Overview
- **Statistics Cards**: Total agents, active agents, pending approvals, and total revenue
- **Real-time Data**: Automatically calculates metrics from agent data
- **Responsive Design**: Optimized for desktop and mobile devices

### 🧾 Agent Management
- **Comprehensive Agent Profiles**: Full name, phone, address, join date, properties count, branches, employees, and subscription amount
- **Status Management**: Visual status badges (Active, Pending, Refused) with color-coded indicators
- **Sortable Columns**: Click any column header to sort data ascending or descending

### 🔍 Advanced Filtering
- **Status Filter**: Filter by agent status (All, Active, Pending, Refused)
- **Search Functionality**: Search by agent name or phone number
- **Date Range Filter**: Filter agents by join date range
- **Clear Filters**: One-click filter reset

### 📄 Pagination
- **Smart Pagination**: 10 agents per page with navigation controls
- **Page Indicators**: Visual page numbers with previous/next buttons
- **Result Counter**: Shows current range and total count

### ⚙️ Agent Actions
Each agent row includes a dropdown menu with the following actions:
- **View Profile**: View agent's public profile
- **Edit Profile**: Modify agent information
- **View Properties**: See agent's published properties
- **Send WhatsApp**: Direct WhatsApp messaging with pre-filled text
- **Delete Agent**: Remove agent from the system (with confirmation)

## 🛠️ Tech Stack

- **Frontend**: Vue.js 3 with Composition API
- **Language**: TypeScript for type safety
- **UI Components**: shadcn/ui for consistent design system
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide Vue Next for modern iconography
- **Data**: Local JSON file with service layer

## 📁 Project Structure

```
src/
├── assets/
│   ├── data/
│   │   └── agents.json          # Sample agent data
│   └── main.css                 # Global styles and Tailwind config
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── FilterBar.vue        # Filter controls component
│   │   └── StatusBadge.vue      # Status indicator component
│   └── agents/                  # Agent-specific components
│       └── AgentsTable.vue      # Main data table component
├── composables/
│   └── useAgents.ts             # Agent data management composable
├── pages/
│   └── agents/
│       └── AgentsPage.vue       # Main dashboard page
├── services/
│   └── agentsService.ts         # Data fetching and manipulation service
├── types/
│   └── agent.ts                 # TypeScript interfaces
└── lib/
    └── utils.ts                 # Utility functions
```

## 🎯 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start development server**:
   ```bash
   pnpm dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

## 📊 Sample Data

The dashboard comes with 10 sample real estate agents with diverse data:
- Different statuses (Active, Pending, Refused)
- Varying property counts, branches, and employee numbers
- Different subscription amounts
- Realistic join dates and contact information

## 🎨 UI Components

All components use shadcn/ui for consistent styling:
- **Tables**: Sortable, responsive data tables
- **Cards**: Information display containers
- **Buttons**: Various button styles and states
- **Badges**: Status indicators with color coding
- **Select/Dropdown**: Filter controls
- **Input**: Search and date inputs

## 🔧 Customization

### Adding New Agents
Modify `src/assets/data/agents.json` to add new agent records following the existing schema.

### Styling Changes
- Update Tailwind classes in components for visual changes
- Modify `src/assets/main.css` for global style adjustments
- Customize shadcn component variants in individual component files

### Adding Features
- Extend the `Agent` interface in `src/types/agent.ts`
- Add new service methods in `src/services/agentsService.ts`
- Create new components in the appropriate directories

## 📱 Responsive Design

The dashboard is fully responsive with:
- **Mobile**: Stacked filter controls, optimized table layout
- **Tablet**: Responsive grid for statistics cards
- **Desktop**: Full-width layout with optimized spacing

## 🔒 Type Safety

Full TypeScript integration ensures:
- Type-safe component props and events
- Validated data structures
- IntelliSense support in development
- Compile-time error detection

## 🚀 Performance Features

- **Efficient Filtering**: Client-side filtering with reactive updates
- **Smart Pagination**: Only renders visible data
- **Optimized Sorting**: In-memory sorting for fast responses
- **Lazy Loading**: Components load only when needed

## 📞 WhatsApp Integration

Direct WhatsApp messaging integration:
- Pre-formatted messages for professional communication
- Automatic phone number formatting
- Opens in new tab/window for seamless experience

## 🎉 Ready to Use

The dashboard is production-ready with:
- Error handling and loading states
- Empty state management
- Confirmation dialogs for destructive actions
- Accessible design following WCAG guidelines
- Clean, maintainable code architecture

Start managing your real estate agents with this powerful, modern dashboard!
