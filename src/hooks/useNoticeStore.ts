import { useState, useEffect } from 'react';
import { Notice, Category, ViewRole, ActiveTab, TargetYear, TargetBranch } from '../types';
import { INITIAL_NOTICES } from '../data/mockNotices';

const STORAGE_KEYS = {
  NOTICES: 'campus_pulse_notices_v1',
  BOOKMARKS: 'campus_pulse_bookmarks_v1',
  ACKNOWLEDGED: 'campus_pulse_acknowledged_v1',
  READ_IDS: 'campus_pulse_read_v1',
  ROLE: 'campus_pulse_role_v1',
  DARK_MODE: 'campus_pulse_dark_v1',
};

export function useNoticeStore() {
  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTICES);
    if (!saved) return INITIAL_NOTICES;
    try {
      const parsed: Notice[] = JSON.parse(saved);
      // Ensure any newly seeded initial notices (e.g. Attendance notices) are included
      const existingIds = new Set(parsed.map(n => n.id));
      const missingInitial = INITIAL_NOTICES.filter(n => !existingIds.has(n.id));
      return [...missingInitial, ...parsed];
    } catch {
      return INITIAL_NOTICES;
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return saved ? JSON.parse(saved) : ['notice-1', 'notice-2'];
  });

  const [acknowledgedIds, setAcknowledgedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACKNOWLEDGED);
    return saved ? JSON.parse(saved) : [];
  });

  const [readIds, setReadIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.READ_IDS);
    return saved ? JSON.parse(saved) : ['notice-1'];
  });

  const [role, setRoleState] = useState<ViewRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as ViewRole) || 'student';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return saved ? JSON.parse(saved) : false;
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [selectedBranch, setSelectedBranch] = useState<string>('All Branches');
  const [activeTab, setActiveTab] = useState<ActiveTab>('feed');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACKNOWLEDGED, JSON.stringify(acknowledgedIds));
  }, [acknowledgedIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.READ_IDS, JSON.stringify(readIds));
  }, [readIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const acknowledgeNotice = (id: string) => {
    if (!acknowledgedIds.includes(id)) {
      setAcknowledgedIds(prev => [...prev, id]);
      setNotices(prev => prev.map(n => n.id === id ? { ...n, acknowledgmentCount: n.acknowledgmentCount + 1 } : n));
    }
  };

  const markAsRead = (id: string) => {
    if (!readIds.includes(id)) {
      setReadIds(prev => [...prev, id]);
      setNotices(prev => prev.map(n => n.id === id ? { ...n, readCount: n.readCount + 1 } : n));
    }
  };

  const setRole = (newRole: ViewRole) => {
    setRoleState(newRole);
    if (newRole === 'admin' && activeTab === 'feed') {
      setActiveTab('admin');
    } else if (newRole === 'student' && (activeTab === 'admin' || activeTab === 'analytics')) {
      setActiveTab('feed');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const addNotice = (newNoticeData: Omit<Notice, 'id' | 'createdAt' | 'readCount' | 'acknowledgmentCount'>) => {
    const newNotice: Notice = {
      ...newNoticeData,
      id: `notice-${Date.now()}`,
      createdAt: new Date().toISOString(),
      readCount: 1,
      acknowledgmentCount: 0,
    };

    setNotices(prev => [newNotice, ...prev]);
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    if (selectedNotice?.id === id) {
      setSelectedNotice(null);
    }
  };

  const togglePin = (id: string) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const resetToDefaultData = () => {
    setNotices(INITIAL_NOTICES);
    setBookmarkedIds(['notice-1', 'notice-2']);
    setAcknowledgedIds([]);
    setReadIds(['notice-1']);
    localStorage.removeItem(STORAGE_KEYS.NOTICES);
  };

  return {
    notices,
    bookmarkedIds,
    acknowledgedIds,
    readIds,
    role,
    setRole,
    isDarkMode,
    toggleDarkMode,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedYear,
    setSelectedYear,
    selectedBranch,
    setSelectedBranch,
    activeTab,
    setActiveTab,
    selectedNotice,
    setSelectedNotice,
    toggleBookmark,
    acknowledgeNotice,
    markAsRead,
    addNotice,
    deleteNotice,
    togglePin,
    resetToDefaultData,
  };
}
