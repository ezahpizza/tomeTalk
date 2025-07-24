import { VscHome, VscAccount, VscSignIn, VscSignOut, VscAdd, VscBook } from 'react-icons/vsc';
import { useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Dock from '@/components/ui/Dock';
import { motion } from 'framer-motion';

const DockNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const goHome = useCallback(() => navigate('/'), [navigate]);
  const goBrowseBooks = useCallback(() => navigate('/List'), [navigate]);
  const goLogin = useCallback(() => navigate('/login'), [navigate]);
  const goSignup = useCallback(() => navigate('/signup'), [navigate]);
  const goAddBook = useCallback(() => navigate('/add-book'), [navigate]);
  const goProfile = useCallback(() => navigate('/profile'), [navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  const icons = useMemo(() => ({
    home: <VscHome size={18} />,
    books: <VscBook size={18} />,
    addBook: <VscAdd size={18} />,
    profile: <VscAccount size={18} />,
    signIn: <VscSignIn size={18} />,
    signOut: <VscSignOut size={18} />,
  }), []);

  const getNavigationItems = useMemo(() => {
    const baseItems = [
      { icon: icons.home, label: 'Home', onClick: goHome },
      { icon: icons.books, label: 'Browse Books', onClick: goBrowseBooks },
    ];

    if (isAuthenticated) {
      return [
        ...baseItems,
        { icon: icons.addBook, label: 'Add Book', onClick: goAddBook },
        { icon: icons.profile, label: 'Profile', onClick: goProfile },
        { icon: icons.signOut, label: 'Sign Out', onClick: handleLogout },
      ];
    } else {
      return [
        ...baseItems,
        { icon: icons.signIn, label: 'Sign In', onClick: goLogin },
        { icon: icons.profile, label: 'Sign Up', onClick: goSignup },
      ];
    }
  }, [icons, isAuthenticated, goHome, goBrowseBooks, goAddBook, goProfile, handleLogout, goLogin, goSignup]);

  return (
    <motion.div
      className="fixed bottom-2 left-1/2 transform -translate-x-1/2 pointer-events-none w-fit"
      style={{ isolation: 'isolate' }}
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div style={{ pointerEvents: 'auto' }}>
        <Dock 
          className="bg-cobalt"
          items={getNavigationItems}
          panelHeight={90}
          baseItemSize={60}
          magnification={90}
        />
      </div>
    </motion.div>
  );
};

export default DockNav;
