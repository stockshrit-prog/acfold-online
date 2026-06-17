# Todo App 📝

A modern, feature-rich to-do list application with local storage functionality. Built with React, Tailwind CSS, and Zustand.

## Features

- ✅ **Add, Edit, Delete Todos** - Full CRUD operations
- 🔍 **Search Functionality** - Find todos instantly
- 🏷️ **Filter by Status** - View All, Active, or Completed todos
- 💾 **Local Storage** - Todos persist between sessions
- 📊 **Stats Dashboard** - View your productivity metrics
- 🎯 **Mark Complete** - Track completed tasks
- 🌓 **Clean UI** - Beautiful, responsive design
- ⚡ **Fast & Lightweight** - No backend required
- 📱 **Mobile Friendly** - Works on all devices
- 🔒 **Private** - All data stays on your device

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Lucide React** - Icons

## Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx      # Search and add todo
│   │   ├── FilterTabs.jsx     # Filter by status
│   │   ├── TodoItem.jsx       # Single todo item
│   │   └── ActionBar.jsx      # Clear actions
│   ├── store/
│   │   └── todoStore.js       # Zustand store with local storage
│   ├── App.jsx                # Main component
│   ├── index.css              # Global styles
│   └── main.jsx               # Entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

## Getting Started

### Installation

```bash
cd todo-app
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5174`

### Build for Production

```bash
npm run build
```

## How It Works

### Local Storage

All todos are automatically saved to your browser's local storage. The app persists:
- Todo text
- Completion status
- Creation date
- Todo IDs

### State Management

Using Zustand for simple, efficient state management:

```javascript
const { todos, addTodo, deleteTodo, toggleTodo } = useTodoStore()
```

### Features

#### Add Todo
Click "Add" or press Enter to create a new todo

#### Edit Todo
Click the edit icon to modify any todo

#### Complete Todo
Click the checkbox to mark a todo as complete

#### Search
Use the search bar to filter todos by text

#### Filter by Status
- **All** - View all todos
- **Active** - Only incomplete todos
- **Completed** - Only finished todos

#### Clear Actions
- **Clear Completed** - Remove all completed todos
- **Clear All** - Remove all todos (confirmation required)

## Local Storage API

The app uses the browser's localStorage API:

```javascript
localStorage.getItem('todos')  // Get todos
localStorage.setItem('todos', JSON.stringify(updated))  // Save todos
localStorage.removeItem('todos')  // Clear todos
```

## Keyboard Shortcuts

- `Enter` - Add new todo or save edit
- `Escape` - Cancel editing

## Responsive Design

- Desktop: Full 2-column layout
- Tablet: Optimized spacing
- Mobile: Single column with touch-friendly buttons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Privacy

- ✅ No server uploads
- ✅ No tracking
- ✅ All data stored locally
- ✅ Works 100% offline

## Future Enhancements

- [ ] Categories/Tags
- [ ] Due dates & reminders
- [ ] Priority levels
- [ ] Dark mode
- [ ] Export to JSON/CSV
- [ ] Import from file
- [ ] Sync across devices
- [ ] Subtasks

## License

MIT - Free to use and modify

## Support

Need help? Check the code comments or create an issue.

---

**Made with ❤️ for productive people**
