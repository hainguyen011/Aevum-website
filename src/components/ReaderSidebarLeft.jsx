import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, ChevronRight, ChevronDown, Layers, Folder, Check } from 'lucide-react';

/**
 * ReaderSidebarLeft — Reusable Unified Left Navigation Sidebar
 * Features:
 *  - High-end Category Dropdown Option selector for neat, focused navigation.
 *  - Collapsible accordion dropdown headers for each category.
 *  - Quick search filter with keyboard '/' shortcut.
 *  - Universal dark/light mode harmonized typography.
 */
export const ReaderSidebarLeft = ({
  searchQuery = '',
  onSearchChange = () => {},
  searchPlaceholder = 'Lọc...',
  categories = {}, // Array of groups or dictionary object { [catName]: items }
  activeId = '',
  onSelectItem = () => {},
  getItemHref = null,
  footerLeft = null,
  footerRight = null,
  className = '',
  isVi = true,
  disabled = false,
  asMobileDrawer = false,
  onCloseDrawer = null
}) => {
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState({});

  // Keyboard shortcut: Pressing '/' anywhere focuses the search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close category dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Normalize categories whether passed as Array or Object
  const normalizedCategories = useMemo(() => {
    if (Array.isArray(categories)) {
      return categories.map((group) => ({
        id: String(group.id || group.name || group.categoryName),
        name: group.name || group.categoryName || group.title,
        count: group.count ?? group.items?.length ?? group.lessons?.length ?? 0,
        items: group.items || group.lessons || []
      })).filter((group) => group.items.length > 0);
    }
    if (categories && typeof categories === 'object') {
      return Object.keys(categories).map((catName) => ({
        id: catName,
        name: catName,
        count: categories[catName].length,
        items: categories[catName]
      })).filter((group) => group.items.length > 0);
    }
    return [];
  }, [categories]);

  // Compute total items across all categories
  const totalItemCount = useMemo(() => {
    return normalizedCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [normalizedCategories]);

  // Auto-expand category containing the active item & sync state
  useEffect(() => {
    if (!activeId) return;
    const parentCat = normalizedCategories.find((cat) =>
      cat.items.some((item) => item.id === activeId)
    );
    if (parentCat) {
      setExpandedCategories((prev) => ({
        ...prev,
        [parentCat.id]: true
      }));
    }
  }, [activeId, normalizedCategories]);

  // Auto-expand all categories when searching so results are visible
  useEffect(() => {
    if (searchQuery.trim()) {
      const allOpen = {};
      normalizedCategories.forEach((cat) => {
        allOpen[cat.id] = true;
      });
      setExpandedCategories(allOpen);
    }
  }, [searchQuery, normalizedCategories]);

  // Toggle single category accordion
  const toggleCategory = (catId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  // Find currently selected category object
  const currentCategoryObj = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return normalizedCategories.find((c) => c.id === selectedCategory);
  }, [selectedCategory, normalizedCategories]);

  // Filtered categories according to dropdown option selection
  const displayedCategories = useMemo(() => {
    if (selectedCategory === 'all') {
      return normalizedCategories;
    }
    return normalizedCategories.filter((c) => c.id === selectedCategory);
  }, [selectedCategory, normalizedCategories]);

  const content = (
    <div className="flex flex-col justify-between h-full bg-transparent">
      {/* Top Header Block: Search & Dropdown Option Selector */}
      <div className="p-3.5 pb-2.5 shrink-0 space-y-2">
        {/* Quick Filter Search Bar */}
        <div className="relative">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-100 border border-white/5 [html[data-theme='light']_&]:border-slate-200/80 rounded-md pl-8 pr-10 py-1.5 text-xs text-white [html[data-theme='light']_&]:text-slate-900 placeholder-slate-500 focus:outline-none focus:bg-white/[0.07] [html[data-theme='light']_&]:focus:bg-white transition-colors font-sans"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
            {searchQuery ? (
              <button
                onClick={() => onSearchChange('')}
                className="text-slate-500 hover:text-white [html[data-theme='light']_&]:hover:text-slate-900 p-0.5 cursor-pointer"
                aria-label={isVi ? 'Xóa bộ lọc' : 'Clear filter'}
              >
                <X size={12} />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block text-[9px] font-sans bg-white/5 [html[data-theme='light']_&]:bg-slate-200 px-1.5 py-0.5 rounded text-slate-400 [html[data-theme='light']_&]:text-slate-600 select-none">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* High-end Category Dropdown Option Selector */}
        {normalizedCategories.length > 1 && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md bg-white/[0.03] [html[data-theme='light']_&]:bg-slate-100/90 hover:bg-white/[0.06] [html[data-theme='light']_&]:hover:bg-slate-200/80 border border-white/10 [html[data-theme='light']_&]:border-slate-200 text-xs transition-all cursor-pointer group"
              aria-expanded={categoryDropdownOpen}
            >
              <div className="flex items-center gap-2 truncate min-w-0">
                <Layers size={13} className="text-slate-400 shrink-0 group-hover:text-white [html[data-theme='light']_&]:group-hover:text-slate-900 transition-colors" />
                <span className="truncate font-medium text-white [html[data-theme='light']_&]:text-slate-900 text-[12px]">
                  {selectedCategory === 'all'
                    ? (isVi ? 'Tất cả chuyên mục' : 'All categories')
                    : currentCategoryObj?.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
                <span className="text-[10px] font-sans font-medium text-slate-500 [html[data-theme='light']_&]:text-slate-600 bg-white/[0.04] [html[data-theme='light']_&]:bg-slate-200 px-1.5 py-0.5 rounded">
                  {selectedCategory === 'all' ? totalItemCount : currentCategoryObj?.count}
                </span>
                <ChevronDown
                  size={12}
                  className={`text-slate-400 transition-transform duration-200 ${
                    categoryDropdownOpen ? 'rotate-180 text-white [html[data-theme="light"]_&]:text-slate-900' : ''
                  }`}
                />
              </div>
            </button>

            {/* Floating Dropdown Option Menu */}
            {categoryDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 z-50 p-1 rounded-lg bg-[#0E1118]/95 [html[data-theme='light']_&]:bg-white/95 border border-white/15 [html[data-theme='light']_&]:border-slate-300 shadow-2xl backdrop-blur-xl animate-fadeIn max-h-64 overflow-y-auto scrollbar-thin">
                {/* Option 1: All Categories */}
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCategoryDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors cursor-pointer text-left ${
                    selectedCategory === 'all'
                      ? 'bg-white/10 [html[data-theme="light"]_&]:bg-slate-200 text-white [html[data-theme="light"]_&]:text-slate-900'
                      : 'text-slate-400 [html[data-theme="light"]_&]:text-slate-600 hover:text-white [html[data-theme="light"]_&]:hover:text-slate-900 hover:bg-white/[0.04] [html[data-theme="light"]_&]:hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Layers size={12} className="shrink-0 text-slate-500" />
                    <span className="truncate">{isVi ? 'Tất cả chuyên mục' : 'All categories'}</span>
                  </div>
                  <span className="text-[10px] font-sans font-medium opacity-60 ml-2">{totalItemCount}</span>
                </button>

                <div className="my-1 border-t border-white/5 [html[data-theme='light']_&]:border-slate-100" />

                {/* Individual Category Options */}
                {normalizedCategories.map((group) => {
                  const isSelected = selectedCategory === group.id;
                  return (
                    <button
                      key={group.id}
                      onClick={() => {
                        setSelectedCategory(group.id);
                        setCategoryDropdownOpen(false);
                        setExpandedCategories((prev) => ({ ...prev, [group.id]: true }));
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors cursor-pointer text-left ${
                        isSelected
                          ? 'bg-white/10 [html[data-theme="light"]_&]:bg-slate-200 text-white [html[data-theme="light"]_&]:text-slate-900'
                          : 'text-slate-400 [html[data-theme="light"]_&]:text-slate-600 hover:text-white [html[data-theme="light"]_&]:hover:text-slate-900 hover:bg-white/[0.04] [html[data-theme="light"]_&]:hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Folder size={12} className="shrink-0 text-slate-500" />
                        <span className="truncate">{group.name}</span>
                      </div>
                      <span className="text-[10px] font-sans font-medium opacity-60 ml-2">{group.count}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Categories & Items Navigation - Scrollable Content with Collapsible Accordions */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
        {displayedCategories.map((group) => {
          // If searching or in single category view, force expanded
          const isExpanded = selectedCategory !== 'all' || searchQuery.trim().length > 0 || !!expandedCategories[group.id];

          return (
            <div key={group.id} className="space-y-1">
              {/* Category Dropdown Accordion Header */}
              <button
                type="button"
                onClick={() => toggleCategory(group.id)}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-white/[0.03] [html[data-theme='light']_&]:hover:bg-slate-100/70 transition-colors cursor-pointer group/cat text-left select-none"
              >
                <div className="flex items-center gap-2 truncate min-w-0">
                  <ChevronDown
                    size={12}
                    className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                      isExpanded ? '' : '-rotate-90'
                    }`}
                  />
                  <span className="text-[11px] font-sans font-medium text-slate-300 [html[data-theme='light']_&]:text-slate-700 uppercase tracking-wider truncate group-hover/cat:text-white [html[data-theme='light']_&]:group-hover/cat:text-slate-900 transition-colors">
                    {group.name}
                  </span>
                </div>
                <span className="text-[10px] font-sans font-medium text-slate-500 [html[data-theme='light']_&]:text-slate-400 shrink-0 ml-1.5">
                  {group.count}
                </span>
              </button>

              {/* Collapsible Items List with Refined Tree Branch Lines */}
              {isExpanded && (
                <ul className="relative ml-[13.5px] pl-3.5 my-1 space-y-0.5 animate-fadeIn">
                  {/* Subtle top branch connector from header chevron to tree trunk */}
                  <span
                    className="absolute left-0 -top-1 h-1 w-[1px] bg-white/[0.08] [html[data-theme='light']_&]:bg-slate-300/70 pointer-events-none"
                    aria-hidden="true"
                  />

                  {group.items.map((item, idx) => {
                    const isLast = idx === group.items.length - 1;
                    const isActive = item.id === activeId;
                    const href = getItemHref ? getItemHref(item) : `#${item.id}`;

                    return (
                      <li key={item.id} className="relative group/item">
                        {/* Branch Line Connectors */}
                        {!isLast ? (
                          <>
                            {/* Vertical trunk line */}
                            <span
                              className="absolute -left-3.5 top-0 bottom-0 w-[1px] bg-white/[0.08] [html[data-theme='light']_&]:bg-slate-300/70 pointer-events-none"
                              aria-hidden="true"
                            />
                            {/* Horizontal branch connector tick with breathing padding before card */}
                            <span
                              className={`absolute -left-3.5 top-1/2 -translate-y-1/2 w-2 h-[1px] rounded-r-full transition-colors duration-150 pointer-events-none ${
                                isActive
                                  ? 'bg-white/35 [html[data-theme="light"]_&]:bg-slate-400'
                                  : 'bg-white/[0.08] [html[data-theme="light"]_&]:bg-slate-300/70 group-hover/item:bg-white/20 [html[data-theme="light"]_&]:group-hover/item:bg-slate-400/80'
                              }`}
                              aria-hidden="true"
                            />
                          </>
                        ) : (
                          /* Last item: soft curved branch at bottom tail (< / └ shape) */
                          <span
                            className={`absolute -left-3.5 top-0 w-2 h-1/2 border-l border-b rounded-bl-[5px] transition-colors duration-150 pointer-events-none ${
                              isActive
                                ? 'border-white/35 [html[data-theme="light"]_&]:border-slate-400'
                                : 'border-white/[0.08] [html[data-theme="light"]_&]:border-slate-300/70 group-hover/item:border-white/20 [html[data-theme="light"]_&]:group-hover/item:border-slate-400/80'
                            }`}
                            aria-hidden="true"
                          />
                        )}

                        <a
                          href={href}
                          onClick={(e) => {
                            e.preventDefault();
                            onSelectItem(item);
                            if (asMobileDrawer && onCloseDrawer) {
                              onCloseDrawer();
                            }
                          }}
                          className={`w-full flex items-center justify-between text-left py-1.5 px-2.5 rounded-md text-xs font-normal transition-colors duration-150 ease-out cursor-pointer ${
                            isActive
                              ? 'text-white [html[data-theme="light"]_&]:text-slate-900 font-medium bg-white/10 [html[data-theme="light"]_&]:bg-slate-200 shadow-sm'
                              : 'text-slate-400 [html[data-theme="light"]_&]:text-slate-600 hover:text-white [html[data-theme="light"]_&]:hover:text-slate-900 hover:bg-white/[0.03] [html[data-theme="light"]_&]:hover:bg-slate-100/60'
                          }`}
                        >
                          <span className="truncate">{item.title}</span>
                          <ChevronRight
                            size={12}
                            className={`shrink-0 transition-transform duration-150 ${
                              isActive
                                ? 'translate-x-0.5 text-white [html[data-theme="light"]_&]:text-slate-900'
                                : 'opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 text-slate-500'
                            }`}
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer Hint */}
      {(footerLeft || footerRight) && (
        <div className="p-3.5 flex items-center justify-between text-[11px] font-sans font-medium text-slate-400 [html[data-theme='light']_&]:text-slate-500 shrink-0">
          <div>{footerLeft}</div>
          <div>{footerRight}</div>
        </div>
      )}
    </div>
  );

  if (asMobileDrawer) {
    return content;
  }

  return (
    <aside
      className={`hidden lg:block w-64 shrink-0 bg-transparent ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      } ${className}`}
    >
      <div className="sticky top-[73px] flex flex-col justify-between h-[calc(100vh-73px)]">
        {content}
      </div>
    </aside>
  );
};

export default ReaderSidebarLeft;
