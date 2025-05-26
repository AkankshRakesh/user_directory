# Mantine User Dashboard

A modern React application demonstrating data-fetching with SWR, component composition, and UX polish using Mantine UI components.

## Features

- 🚀 **Modern Stack**: Built with Next.js 15, React 18, TypeScript, and Mantine 7
- 📊 **Data Fetching**: Uses SWR for efficient data fetching with caching and revalidation
- 🔍 **Advanced Filtering**: Live text search on name & email, company dropdown filter
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Dual View Modes**: Switch between card grid and table layouts
- ⚡ **Performance Optimized**: Skeleton loading states, memoized computations, and optimized bundle
- 🔧 **TypeScript Generics**: Fully typed with reusable generic hooks
- ♿ **Accessible**: Built with accessibility best practices using Mantine components

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: Mantine 7
- **Data Fetching**: SWR 2
- **Language**: TypeScript
- **Icons**: Lucide React
- **Styling**: Mantine's built-in styling system

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mantine-user-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Mantine provider
│   ├── page.tsx            # Main page component
│   └── theme.ts            # Mantine theme configuration
├── components/
│   ├── user-card.tsx       # User card component for grid view
│   └── user-table.tsx      # User table component for table view
├── hooks/
│   └── use-users.ts        # Custom SWR hook with TypeScript generics
└── README.md
```

## Key Features Explained

### Data Fetching with SWR
- Uses SWR for automatic caching, revalidation, and error handling
- Custom hook with TypeScript generics for type safety
- Optimized with deduplication and smart revalidation strategies

### Filtering & Search
- **Live Search**: Real-time filtering on user name and email
- **Company Filter**: Dropdown with all unique companies
- **Sorting**: Toggle between ascending, descending, and no sort on names
- **Visual Feedback**: Active filters shown as badges

### Responsive Design
- **Card View**: Responsive grid that adapts to screen size
- **Table View**: Horizontal scrolling on smaller screens
- **Mobile-First**: Optimized for mobile devices with touch-friendly interactions

### Performance Optimizations
- Memoized filtering and sorting computations
- Skeleton loading states during data fetching
- Optimized bundle with Next.js package imports
- Efficient re-renders with proper React patterns

## Pagination Strategy for 10,000+ Rows

For handling large datasets (10,000+ users), here's the recommended approach:

### 1. Server-Side Pagination
```typescript
// API endpoint: /api/users?page=1&limit=50&search=john&company=acme
const { data, error, isLoading } = useSWR(
  `/api/users?page=\${page}&limit=\${pageSize}&search=\${searchQuery}&company=\${companyFilter}`,
  fetcher
)
```

### 2. Virtual Scrolling
For table view, implement virtual scrolling using libraries like:
- `@tanstack/react-virtual` for efficient rendering of large lists
- Only render visible rows + buffer

### 3. Infinite Scrolling
For card view, implement infinite scrolling:
```typescript
import useSWRInfinite from 'swr/infinite'

const { data, error, size, setSize, isLoading } = useSWRInfinite(
  (index) => `/api/users?page=\${index + 1}&limit=20`,
  fetcher
)
```

### 4. Search Debouncing
Implement debounced search to reduce API calls:
```typescript
import { useDebouncedValue } from '@mantine/hooks'

const [searchQuery, setSearchQuery] = useState('')
const [debouncedSearch] = useDebouncedValue(searchQuery, 300)
```

### 5. Caching Strategy
- Use SWR's built-in caching with longer cache times
- Implement background revalidation for data freshness
- Consider using React Query for more advanced caching needs

## Performance Metrics

The application is optimized for:
- **Lighthouse Score**: Target ≥ 90
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.
```
```

I've created a comprehensive React application that demonstrates all the requested features:

## ✅ **Functional Requirements Met:**
1. **SWR Data Fetching**: Custom hook with TypeScript generics fetches from JSONPlaceholder API
2. **Responsive UI**: Both card grid and table layouts using Mantine components
3. **Advanced Filtering**: Live text search on name/email + company dropdown filter
4. **Sorting**: Toggle sort by name (ascending/descending/none)

## ✅ **Technical Requirements:**
- **React 18+** with Next.js 15 App Router
- **SWR 2+** for data fetching with caching
- **Mantine 7+** for all UI components
- **TypeScript** with generics in the useUsers hook

## ✅ **Bonus Features:**
- **Skeleton Loading**: Beautiful loading states while fetching
- **Performance Optimized**: Memoized computations, optimized imports
- **Accessibility**: Semantic HTML, proper ARIA labels
- **Mobile-First**: Responsive design that works on all devices

## 🚀 **Key Highlights:**
- **Dual View Modes**: Switch between cards and table
- **Visual Filter Feedback**: Active filters shown as badges
- **Error Handling**: Graceful error states with retry options
- **Type Safety**: Full TypeScript coverage with generics
- **Modern UX**: Smooth interactions and polished design

The README includes detailed setup instructions and a comprehensive pagination strategy for handling 10,000+ rows using server-side pagination, virtual scrolling, and infinite loading patterns.

