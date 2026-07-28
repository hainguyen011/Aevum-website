import React from 'react';
import diagramImg from 'C:/Users/Admin/.gemini/antigravity-ide/brain/40b849b2-968b-4b98-9285-4759ab449ef3/aevum_external_brain_diagram_1785253383201.png';
import HeadGif from "../../assets/head.gif"

export const FrameworkFlow = () => {
  return (
    <div id="orchestration" className="border-subtle-b bg-[#0B0B11] relative overflow-hidden">

      {/* Section Header */}
      <div className="p-8 sm:p-12 text-center border-subtle-b bg-[#0B0B11] relative z-10">
        <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
          UNIFIED EXTERNAL BRAIN INFRASTRUCTURE
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-3 font-display">
          Central Workspace <br />
          <span className="bg-[#00f0ff] text-[#0B0B11] px-3 py-0.5 inline-block font-extrabold mt-2">
            & External Brain Hub
          </span>
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
          Aevum OS operates as a decoupled External Brain — serving as the single source of truth for living context memory, architectural decisions, and agent squad state across all your AI development environments.
        </p>
      </div>

      {/* High-Tech External Brain Infographic Graphic Container */}
      <div className="bg-[#07080E] relative flex items-center justify-center">

        <div className="w-full relative flex items-center justify-center" style={{ maxHeight: "350px" }}>
          <div className='image-box'>
            <img
              src={HeadGif}
              alt="Aevum External Brain Architecture Diagram"
              className="w-full h-auto object-contain"
              style={{ objectFit: "cover", }}
            />
          </div>
          <div className='image-box'>
            <img
              src={HeadGif}
              alt="Aevum External Brain Architecture Diagram"
              className="w-full h-auto object-contain"
              style={{ objectFit: "cover", }}
            />
          </div>
          <div className='image-box'>
            <img
              src={HeadGif}
              alt="Aevum External Brain Architecture Diagram"
              className="w-full h-auto object-contain"
              style={{ objectFit: "cover", }}
            />
          </div>
          <div className='image-box'>
            <img
              src={HeadGif}
              alt="Aevum External Brain Architecture Diagram"
              className="w-full h-auto object-contain"
              style={{ objectFit: "cover", }}
            />
          </div>
          <div className='image-box'>
            <img
              src={HeadGif}
              alt="Aevum External Brain Architecture Diagram"
              className="w-full h-auto object-contain"
              style={{ objectFit: "cover", }}
            />
          </div>
        </div>

      </div>

    </div>
  );
};
