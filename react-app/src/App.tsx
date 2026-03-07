import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Games from './pages/Games'
import Players from './pages/Players'
import League from './pages/League'
import PlayerDetail from './pages/PlayerDetail'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/games" element={<Games />} />
              <Route path="/players" element={<Players />} />
              <Route path="/players/:id" element={<PlayerDetail />} />
              <Route path="/league" element={<League />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
