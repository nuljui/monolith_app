import { useState } from 'react';
import CreatePage from './pages/CreatePage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import { Page, ProfileTab } from './types';

const App = () => {
    // Simple state-based router
    const [currentPage, setCurrentPage] = useState<Page>('landing');
    const [currentProfileTab, setCurrentProfileTab] = useState<ProfileTab>('collection');

    const handleNavigate = (page: Page, tab?: ProfileTab) => {
        setCurrentPage(page);
        if (tab) {
            setCurrentProfileTab(tab);
        }
    };

    return (
        <div className="antialiased text-ink bg-stone-50 min-h-screen">
            {currentPage === 'create' && <CreatePage onNavigate={handleNavigate} />}
            {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
            {currentPage === 'profile' && <ProfilePage onNavigate={handleNavigate} activeTab={currentProfileTab} />}
        </div>
    );
};

export default App;
