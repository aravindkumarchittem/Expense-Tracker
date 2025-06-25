# 💰 Expense Tracker for Enterprise Categories

A modern, minimalistic expense tracking web application built with React, TypeScript, and Tailwind CSS. Perfect for managing business expenses across different enterprise categories.

![Expense Tracker](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-blue)

## ✨ Features

### 🏠 Dashboard
- **Monthly expense overview** with total amount and count
- **Interactive category breakdown** with animated progress bars
- **Top 3 spending categories** with ranking system
- **Quick action buttons** for navigation
- **Responsive design** for all screen sizes

### ➕ Add Expense
- **Clean form interface** with validation
- **Real-time preview** of expense entries
- **Category selection** with icons
- **Date picker** with smart defaults
- **Optional notes** field
- **Loading states** and error handling

### 📋 All Expenses
- **Advanced filtering system** (category, date, search)
- **Sorting options** (date, amount, title)
- **Inline editing** capabilities
- **Delete functionality** with confirmation
- **Summary statistics** for filtered results
- **Empty state** handling

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Linting**: ESLint
- **Icons**: Emojis + Custom icons

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:jaaduservices/expense-tracker-web.git
   cd expense-tracker-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

### Quality Checks

```bash
# Run linting
npm run lint

# Type checking
npm run build
```

## 📱 Screenshots

### Dashboard Overview
- Monthly expense statistics
- Category breakdown charts
- Top spending categories

### Add Expense Form
- Intuitive form design
- Real-time validation
- Live preview

### Expenses Management
- Advanced filtering
- Inline editing
- Bulk operations

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.tsx      # Navigation component
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Dashboard overview
│   ├── AddExpense.tsx  # Add new expense form
│   └── AllExpenses.tsx # Expense management
├── utils/              # Utility functions
│   ├── mockData.ts     # Sample data & types
│   └── categoryIcons.ts # Category icons & colors
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
├── index.css          # Global styles & Tailwind
└── vite-env.d.ts      # TypeScript declarations
```

## 🎨 Design System

### Color Palette
- **Primary**: Electric blue (#3B82F6)
- **Accent**: Purple/Pink gradient
- **Background**: Dark theme (#0F0F0F)
- **Cards**: Semi-transparent glass effect
- **Text**: High contrast white/gray

### Categories
- 🍽️ **Food** - Orange to red gradient
- 💼 **Business** - Blue to indigo gradient
- ✈️ **Travel** - Green to teal gradient
- 🛍️ **Shopping** - Purple to pink gradient
- 🏥 **Health** - Red to rose gradient
- 📚 **Education** - Yellow to orange gradient
- 📦 **Other** - Gray to slate gradient

## 📊 Data Model

```typescript
interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

type ExpenseCategory = 
  | 'Food' | 'Business' | 'Travel' 
  | 'Shopping' | 'Health' | 'Education' | 'Other';
```

## 🔮 Future Enhancements

- [ ] User authentication (Sign Up/Login)
- [ ] Data persistence (Database integration)
- [ ] Export to CSV functionality
- [ ] Monthly/yearly reports
- [ ] Budget setting and tracking
- [ ] Receipt image uploads
- [ ] Multi-currency support
- [ ] Dark/Light theme toggle
- [ ] Mobile app (React Native)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern fintech applications
- Icons and illustrations from various open-source projects
- Community feedback and suggestions

---

**Built with ❤️ by [Jaadu Services](https://github.com/jaaduservices)**

For support or questions, please open an issue on GitHub.
