import { useState } from 'react';
import CreatePage from './pages/CreatePage';
import LandingPage from './pages/LandingPage';
import { Page } from './types';

const App = () => {
    // Simple state-based router
    const [currentPage, setCurrentPage] = useState<Page>('create');

    const handleNavigate = (page: Page) => {
        setCurrentPage(page);
    };

    return (
        <div className="antialiased text-ink bg-stone-50 min-h-screen">
            {currentPage === 'create' && <CreatePage onNavigate={handleNavigate} />}
            {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
        </div>
    );
};

export default App;
