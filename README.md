# AcFold Online 🚀

Professional ACP/ACM Fabrication Software - Drawing, Folding, Nesting, CNC & Production Management

## Features

- ✅ 2D Drawing Workspace
- ✅ 3D Visualization
- ✅ Fold Engine
- ✅ Smart Nesting
- ✅ CNC Generator
- ✅ Cost Calculator
- ✅ Export (DXF, SVG, PDF, PNG)
- ✅ Project Management
- ✅ Material Library

## Tech Stack

- **Frontend:** React 18, Tailwind CSS, Konva.js, Three.js
- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Deployment:** Vercel, Railway

## Getting Started

### Installation

```bash
# Clone repository
git clone https://github.com/stockshrit-prog/acfold-online.git
cd acfold-online

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
```

### Configuration

Edit `.env.local` with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_URL=http://localhost:3001
```

### Running

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server:dev
```

Visit `http://localhost:5173`

## Database Setup

Create these tables in Supabase:

```sql
-- Users table (auto-created by Supabase Auth)

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  data JSONB DEFAULT '{}',
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their projects"
  ON projects FOR ALL
  USING (auth.uid() = user_id);
```

## Project Structure

```
src/
├── components/     # React components
├── pages/         # Page components
├── services/      # API services
├── stores/        # Zustand stores
├── utils/         # Utilities
└── styles/        # CSS styles
```

## Deployment

### Vercel (Frontend)

```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Backend

Deploy `server/` to Railway or Heroku

## License

MIT - See LICENSE file

## Support

stockshrit-prog@github.com

---

**AcFold Online** - Professional Fabrication Software ✨
