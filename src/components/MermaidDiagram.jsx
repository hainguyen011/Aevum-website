import React, { useState, useEffect, useRef, useId } from 'react';
import {
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

/**
 * Transparent Minimalist Mermaid Diagram Component
 * No Header Bar • 100% Transparent Background • Floating Control Pad on Hover (Image 2 style)
 * Powered by official https://github.com/mermaid-js/mermaid
 */
export const MermaidDiagram = ({ content = '', isVi = true }) => {
  const uniqueId = useId().replace(/:/g, '');
  const containerRef = useRef(null);
  const [svgHtml, setSvgHtml] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');

  // Interactive Pan & Zoom State
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Fullscreen Modal Zoom State
  const [modalZoom, setModalZoom] = useState(1);

  // Track Theme Changes on HTML element
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const getTheme = () => document.documentElement.getAttribute('data-theme') || 'dark';
    setCurrentTheme(getTheme());

    const observer = new MutationObserver(() => {
      setCurrentTheme(getTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // Render Mermaid SVG with official mermaid-js
  useEffect(() => {
    let isCancelled = false;

    const renderDiagram = async () => {
      if (!content || typeof window === 'undefined') return;

      setIsLoading(true);
      setError(null);

      try {
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;

        const isLight = currentTheme === 'light';

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          fontFamily: "'Google Sans Flex', 'JetBrains Mono', -apple-system, BlinkMacSystemFont, sans-serif",
          theme: 'base',
          themeVariables: isLight
            ? {
                darkMode: false,
                background: 'transparent',
                fontSize: '13px',
                // Participants & Boxes
                actorBkg: '#ffffff',
                actorBorder: '#94a3b8',
                actorTextColor: '#0f172a',
                actorLineColor: '#cbd5e1',
                // Signals & Arrows
                signalColor: '#334155',
                signalTextColor: '#0f172a',
                lineColor: '#64748b',
                // Notes & Messages
                noteBkgColor: '#f1f5f9',
                noteTextColor: '#1e293b',
                noteBorderColor: '#cbd5e1',
                // Activation Bars
                activationBorderColor: '#94a3b8',
                activationBkgColor: '#e2e8f0',
                sequenceNumberColor: '#0284c7',
                // Flowcharts
                mainBkg: '#ffffff',
                nodeBorder: '#94a3b8',
                textColor: '#0f172a',
                primaryColor: '#ffffff',
                primaryBorderColor: '#94a3b8',
                primaryTextColor: '#0f172a',
                secondaryColor: '#f8fafc',
                secondaryBorderColor: '#cbd5e1',
                secondaryTextColor: '#0f172a'
              }
            : {
                darkMode: true,
                background: 'transparent',
                fontSize: '13px',
                // Participants & Boxes (Dark Charcoal style matching Image 2)
                actorBkg: '#18181b',
                actorBorder: '#3f3f46',
                actorTextColor: '#f4f4f5',
                actorLineColor: '#52525b',
                // Signals & Arrows
                signalColor: '#e4e4e7',
                signalTextColor: '#f4f4f5',
                lineColor: '#71717a',
                // Notes & Messages
                noteBkgColor: '#27272a',
                noteTextColor: '#e4e4e7',
                noteBorderColor: '#3f3f46',
                // Activation Bars
                activationBorderColor: '#71717a',
                activationBkgColor: '#3f3f46',
                sequenceNumberColor: '#38bdf8',
                // Flowcharts
                mainBkg: '#18181b',
                nodeBorder: '#3f3f46',
                textColor: '#f4f4f5',
                primaryColor: '#18181b',
                primaryBorderColor: '#3f3f46',
                primaryTextColor: '#f4f4f5',
                secondaryColor: '#27272a',
                secondaryBorderColor: '#52525b',
                secondaryTextColor: '#f4f4f5'
              },
          flowchart: {
            htmlLabels: true,
            curve: 'basis',
            nodeSpacing: 32,
            rankSpacing: 32,
            padding: 10,
            useMaxWidth: false
          },
          sequence: {
            showSequenceNumbers: true,
            actorMargin: 36,
            boxMargin: 8,
            messageMargin: 26,
            useMaxWidth: false
          }
        });

        const elementId = `mermaid-${uniqueId}-${Date.now()}`;
        const cleanContent = content.trim();

        const { svg } = await mermaid.render(elementId, cleanContent);

        if (!isCancelled) {
          // Guarantee transparent background
          const cleanSvg = svg.replace(/background-color:[^;"]*;?/gi, 'background-color: transparent;');
          setSvgHtml(cleanSvg);
          setError(null);
          setIsLoading(false);
          setZoomLevel(1);
          setPanOffset({ x: 0, y: 0 });
        }
      } catch (err) {
        if (!isCancelled) {
          console.warn('[MermaidDiagram] Render error:', err);
          setError(err?.message || 'Lỗi hiển thị sơ đồ Mermaid');
          setIsLoading(false);
        }
      }
    };

    renderDiagram();

    return () => {
      isCancelled = true;
    };
  }, [content, currentTheme, uniqueId]);

  // Pan & Zoom Handlers
  const handleZoom = (delta) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.5), 2.5));
  };

  const handlePan = (dx, dy) => {
    setPanOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Mouse Drag to Pan
  const handleMouseDown = (e) => {
    // Only drag when clicking background or moving
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel Zoom (with Ctrl key or trackpad pinch)
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.1 : -0.1;
      handleZoom(delta);
    }
  };

  return (
    <>
      {/* Outer Wrapper: 100% Transparent, No Border, No Header */}
      <div className="my-8 w-full bg-transparent relative group select-none">
        {error ? (
          <div className="p-4 rounded-xl font-mono text-[12px] leading-relaxed overflow-x-auto text-red-400 bg-red-500/10 border border-red-500/20">
            <div className="mb-2 font-bold">{error}</div>
            <pre className="whitespace-pre text-slate-400">{content}</pre>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="w-full min-h-[140px] max-h-[380px] sm:max-h-[420px] p-2 sm:p-4 flex items-center justify-center bg-transparent relative overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            {isLoading ? (
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono py-10">
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span>{isVi ? 'Đang vẽ sơ đồ Mermaid...' : 'Rendering diagram...'}</span>
              </div>
            ) : (
              <div
                className="transition-transform duration-75 origin-center w-full max-h-[360px] sm:max-h-[400px] flex justify-center items-center [&>svg]:max-w-full [&>svg]:max-h-[340px] sm:[&>svg]:max-h-[380px] [&>svg]:w-auto [&>svg]:h-auto [&>svg]:mx-auto"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`
                }}
                dangerouslySetInnerHTML={{ __html: svgHtml }}
              />
            )}

            {/* Floating Navigation & Controller Pad: ONLY visible on hover (Image 2 style) */}
            {!isLoading && !error && svgHtml && (
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-20">
                <div className="bg-[#18181b]/95 [html[data-theme='light']_&]:bg-white/95 backdrop-blur-md border border-white/10 [html[data-theme='light']_&]:border-slate-300 rounded-xl p-1 shadow-2xl flex flex-col gap-0.5">
                  <div className="grid grid-cols-3 gap-0.5 text-zinc-300 [html[data-theme='light']_&]:text-slate-700">
                    {/* Row 1: Expand | Up | Zoom In */}
                    <button
                      onClick={() => {
                        setModalZoom(1);
                        setIsZoomed(true);
                      }}
                      className="p-1.5 rounded-lg hover:bg-white/10 [html[data-theme='light']_&]:hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center"
                      title={isVi ? 'Toàn màn hình' : 'Fullscreen'}
                    >
                      <Maximize2 size={13} />
                    </button>
                    <button
                      onClick={() => handlePan(0, 40)}
                      className="p-1.5 rounded-lg hover:bg-white/10 [html[data-theme='light']_&]:hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center"
                      title={isVi ? 'Di chuyển lên' : 'Pan up'}
                    >
                      <ChevronUp size={13} />
                    </button>
                    <button
                      onClick={() => handleZoom(0.15)}
                      className="p-1.5 rounded-lg hover:bg-white/10 [html[data-theme='light']_&]:hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center"
                      title={isVi ? 'Phóng to' : 'Zoom in'}
                    >
                      <ZoomIn size={13} />
                    </button>

                    {/* Row 2: Left | Reset | Right */}
                    <button
                      onClick={() => handlePan(40, 0)}
                      className="p-1.5 rounded-lg hover:bg-white/10 [html[data-theme='light']_&]:hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center"
                      title={isVi ? 'Di chuyển sang trái' : 'Pan left'}
                    >
                      <ChevronLeft size={13} />
                    </button>
                    <button
                      onClick={handleReset}
                      className="p-1.5 rounded-lg hover:bg-white/10 [html[data-theme='light']_&]:hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center text-cyan-400 [html[data-theme='light']_&]:text-cyan-600 font-bold"
                      title={isVi ? 'Đặt lại kích thước' : 'Reset view'}
                    >
                      <RotateCcw size={13} />
                    </button>
                    <button
                      onClick={() => handlePan(-40, 0)}
                      className="p-1.5 rounded-lg hover:bg-white/10 [html[data-theme='light']_&]:hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center"
                      title={isVi ? 'Di chuyển sang phải' : 'Pan right'}
                    >
                      <ChevronRight size={13} />
                    </button>

                    {/* Row 3: Spacer | Down | Zoom Out */}
                    <div />
                    <button
                      onClick={() => handlePan(0, -40)}
                      className="p-1.5 rounded-lg hover:bg-white/10 [html[data-theme='light']_&]:hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center"
                      title={isVi ? 'Di chuyển xuống' : 'Pan down'}
                    >
                      <ChevronDown size={13} />
                    </button>
                    <button
                      onClick={() => handleZoom(-0.15)}
                      className="p-1.5 rounded-lg hover:bg-white/10 [html[data-theme='light']_&]:hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center"
                      title={isVi ? 'Thu nhỏ' : 'Zoom out'}
                    >
                      <ZoomOut size={13} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal with Zoom Controls */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Header Controls */}
          <div className="absolute top-5 right-5 flex items-center gap-2 z-30" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setModalZoom((z) => Math.min(z + 0.2, 3))}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Phóng to"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => setModalZoom((z) => Math.max(z - 0.2, 0.5))}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Thu nhỏ"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={() => setModalZoom(1)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Đặt lại 100%"
            >
              <RotateCcw size={16} />
            </button>
            <button
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              onClick={() => setIsZoomed(false)}
              aria-label="Đóng phóng to"
            >
              <X size={20} />
            </button>
          </div>

          <div
            className="w-full max-w-6xl max-h-[92vh] overflow-auto bg-black/70 [html[data-theme='light']_&]:bg-white rounded-2xl p-6 sm:p-12 border border-white/10 [html[data-theme='light']_&]:border-slate-300 shadow-2xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full flex justify-center [&>svg]:w-full [&>svg]:max-h-[82vh] [&>svg]:h-auto transition-transform duration-150 origin-center"
              style={{ transform: `scale(${modalZoom})` }}
              dangerouslySetInnerHTML={{ __html: svgHtml }}
            />
          </div>
        </div>
      )}
    </>
  );
};
