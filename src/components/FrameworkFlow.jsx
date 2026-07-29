import HeadGif from "../../assets/head.gif";
import { translations } from '../data/translations';

export const FrameworkFlow = ({ activeLang }) => {
  const t = translations[activeLang] || translations.en;

  // Programmatically highlight & External Brain Hub / & Trung tâm Bộ não Ngoại vi
  const titleText = t.frameworkFlow.title;
  let title1 = "Central Workspace";
  let title2 = "& External Brain Hub";
  if (titleText.includes("Trung tâm Bộ não Ngoại vi")) {
    title1 = "Không gian làm việc Trung tâm";
    title2 = "& Trung tâm Bộ não Ngoại vi";
  }

  return (
    <div id="orchestration" className="border-subtle-b bg-[#0B0B11] relative overflow-hidden">

      {/* Section Header */}
      <div className="p-8 sm:p-12 text-center border-subtle-b bg-[#0B0B11] relative z-10">
        <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
          {t.frameworkFlow.tag}
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-3 font-display">
          {title1} <br />
          <span className="bg-[#00f0ff] text-[#0B0B11] px-3 py-0.5 inline-block font-extrabold mt-2">
            {title2}
          </span>
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
          {t.frameworkFlow.desc}
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

export default FrameworkFlow;
