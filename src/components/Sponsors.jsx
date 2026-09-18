import React from 'react';

import anHi from '../../assets/stickers/An_Collection/An_Hi.webp';
import anLover from '../../assets/stickers/An_Collection/An_Lover.webp';
import anLover2 from '../../assets/stickers/An_Collection/An_Lover2.webp';
import anHipe from '../../assets/stickers/An_Collection/An_Hipe.webp';
import anCurios from '../../assets/stickers/An_Collection/An_Curios.webp';
import anAngry from '../../assets/stickers/An_Collection/An_Angry.webp';
import anLoading from '../../assets/stickers/An_Collection/An_Loading.webp';
import anByebye from '../../assets/stickers/An_Collection/An_byebye.webp';

import unikornLogo from '../../assets/unikorn-logo-dark.webp';
import i2fLabsLogo from '../../assets/I2FLabs-logo.webp';

// --- Pure Vector Monochrome Official Brand Logos (Matte, Crisp, Zero Shadows) ---

const LogoUnikorn = () => (
  <div className="flex items-center gap-2.5 font-display font-extrabold tracking-wider">
    <img 
      src={unikornLogo} 
      alt="Unikorn" 
      loading="lazy" 
      decoding="async" 
      width="24" 
      height="24" 
      className="w-6 h-6 object-contain filter grayscale contrast-125 brightness-125" 
    />
    <span className="text-xs sm:text-sm tracking-widest font-mono">UNIKORN</span>
  </div>
);

const LogoI2FLabs = () => (
  <div className="flex items-center gap-2.5 font-display font-black tracking-wider">
    <img 
      src={i2fLabsLogo} 
      alt="I2FLabs" 
      loading="lazy" 
      decoding="async" 
      width="24" 
      height="24" 
      className="w-6 h-6 object-contain filter grayscale contrast-125 brightness-125" 
    />
    <span className="text-xs sm:text-sm tracking-widest font-mono">I2FLABS</span>
  </div>
);

const LogoAntigravity = () => (
  <div className="flex items-center gap-2.5 font-display font-bold">
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wider font-mono">ANTIGRAVITY</span>
  </div>
);

const LogoCursor = () => (
  <div className="flex items-center gap-2.5 font-display font-bold">
    {/* Official Cursor 3D Isometric Box */}
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wider font-sans font-extrabold">Cursor</span>
  </div>
);

const LogoClaude = () => (
  <div className="flex items-center gap-2.5 font-display font-semibold">
    {/* Official Anthropic Claude Sunburst */}
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wide font-serif">Claude</span>
  </div>
);

const LogoMCP = () => (
  <div className="flex items-center gap-2 font-mono font-bold">
    {/* Official Anthropic Model Context Protocol Nodes */}
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.85 0a4.16 4.16 0 0 0-2.95 1.217L1.456 10.66a.835.835 0 0 0 0 1.18.835.835 0 0 0 1.18 0l9.442-9.442a2.49 2.49 0 0 1 3.541 0 2.49 2.49 0 0 1 0 3.541L8.59 12.97l-.1.1a.835.835 0 0 0 0 1.18.835.835 0 0 0 1.18 0l.1-.098 7.03-7.034a2.49 2.49 0 0 1 3.542 0l.049.05a2.49 2.49 0 0 1 0 3.54l-8.54 8.54a1.96 1.96 0 0 0 0 2.755l1.753 1.753a.835.835 0 0 0 1.18 0 .835.835 0 0 0 0-1.18l-1.753-1.753a.266.266 0 0 1 0-.394l8.54-8.54a4.185 4.185 0 0 0 0-5.9l-.05-.05a4.16 4.16 0 0 0-2.95-1.218c-.2 0-.401.02-.6.048a4.17 4.17 0 0 0-1.17-3.552A4.16 4.16 0 0 0 13.85 0m0 3.333a.84.84 0 0 0-.59.245L6.275 10.56a4.186 4.186 0 0 0 0 5.902 4.186 4.186 0 0 0 5.902 0L19.16 9.48a.835.835 0 0 0 0-1.18.835.835 0 0 0-1.18 0l-6.985 6.984a2.49 2.49 0 0 1-3.54 0 2.49 2.49 0 0 1 0-3.54l6.983-6.985a.835.835 0 0 0 0-1.18.84.84 0 0 0-.59-.245" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wider">MCP PROTOCOL</span>
  </div>
);

const LogoOllama = () => (
  <div className="flex items-center gap-2 font-display font-black">
    {/* Official Ollama Silhouette */}
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.361 10.26a.894.894 0 0 0-.558.47l-.072.148.001.207c0 .193.004.217.059.353.076.193.152.312.291.448.24.238.51.3.872.205a.86.86 0 0 0 .517-.436.752.752 0 0 0 .08-.498c-.064-.453-.33-.782-.724-.897a1.06 1.06 0 0 0-.466 0zm-9.203.005c-.305.096-.533.32-.65.639a1.187 1.187 0 0 0-.06.52c.057.309.31.59.598.667.362.095.632.033.872-.205.14-.136.215-.255.291-.448.055-.136.059-.16.059-.353l.001-.207-.072-.148a.894.894 0 0 0-.565-.472 1.02 1.02 0 0 0-.474.007Zm4.184 2c-.131.071-.223.25-.195.383.031.143.157.288.353.407.105.063.112.072.117.136.004.038-.01.146-.029.243-.02.094-.036.194-.036.222.002.074.07.195.143.253.064.052.076.054.255.059.164.005.198.001.264-.03.169-.082.212-.234.15-.525-.052-.243-.042-.28.087-.355.137-.08.281-.219.324-.314a.365.365 0 0 0-.175-.48.394.394 0 0 0-.181-.033c-.126 0-.207.03-.355.124l-.085.053-.053-.032c-.219-.13-.259-.145-.391-.143a.396.396 0 0 0-.193.032zm.39-2.195c-.373.036-.475.05-.654.086-.291.06-.68.195-.951.328-.94.46-1.589 1.226-1.787 2.114-.04.176-.045.234-.045.53 0 .294.005.357.043.524.264 1.16 1.332 2.017 2.714 2.173.3.033 1.596.033 1.896 0 1.11-.125 2.064-.727 2.493-1.571.114-.226.169-.372.22-.602.039-.167.044-.23.044-.523 0-.297-.005-.355-.045-.531-.288-1.29-1.539-2.304-3.072-2.497a6.873 6.873 0 0 0-.855-.031zm.645.937a3.283 3.283 0 0 1 1.44.514c.223.148.537.458.671.662.166.251.26.508.303.82.02.143.01.251-.043.482-.08.345-.332.705-.672.957a3.115 3.115 0 0 1-.689.348c-.382.122-.632.144-1.525.138-.582-.006-.686-.01-.853-.042-.57-.107-1.022-.334-1.35-.68-.264-.28-.385-.535-.45-.946-.03-.192.025-.509.137-.776.136-.326.488-.73.836-.963.403-.269.934-.46 1.422-.512.187-.02.586-.02.773-.002zm-5.503-11a1.653 1.653 0 0 0-.683.298C5.617.74 5.173 1.666 4.985 2.819c-.07.436-.119 1.04-.119 1.503 0 .544.064 1.24.155 1.721.02.107.031.202.023.208a8.12 8.12 0 0 1-.187.152 5.324 5.324 0 0 0-.949 1.02 5.49 5.49 0 0 0-.94 2.339 6.625 6.625 0 0 0-.023 1.357c.091.78.325 1.438.727 2.04l.13.195-.037.064c-.269.452-.498 1.105-.605 1.732-.084.496-.095.629-.095 1.294 0 .67.009.803.088 1.266.095.555.288 1.143.503 1.534.071.128.243.393.264.407.007.003-.014.067-.046.141a7.405 7.405 0 0 0-.548 1.873c-.062.417-.071.552-.071.991 0 .56.031.832.148 1.279L3.42 24h1.478l-.05-.091c-.297-.552-.325-1.575-.068-2.597.117-.472.25-.819.498-1.296l.148-.29v-.177c0-.165-.003-.184-.057-.293a.915.915 0 0 0-.194-.25 1.74 1.74 0 0 1-.385-.543c-.424-.92-.506-2.286-.208-3.451.124-.486.329-.918.544-1.154a.787.787 0 0 0 .223-.531c0-.195-.07-.355-.224-.522a3.136 3.136 0 0 1-.817-1.729c-.14-.96.114-2.005.69-2.834.563-.814 1.353-1.336 2.237-1.475.199-.033.57-.028.776.01.226.04.367.028.512-.041.179-.085.268-.19.374-.431.093-.215.165-.333.36-.576.234-.29.46-.489.822-.729.413-.27.884-.467 1.352-.561.17-.035.25-.04.569-.04.319 0 .398.005.569.04a4.07 4.07 0 0 1 1.914.997c.117.109.398.457.488.602.034.057.095.177.132.267.105.241.195.346.374.43.14.068.286.082.503.045.343-.058.607-.053.943.016 1.144.23 2.14 1.173 2.581 2.437.385 1.108.276 2.267-.296 3.153-.097.15-.193.27-.333.419-.301.322-.301.722-.001 1.053.493.539.801 1.866.708 3.036-.062.772-.26 1.463-.533 1.854a2.096 2.096 0 0 1-.224.258.916.916 0 0 0-.194.25c-.054.109-.057.128-.057.293v.178l.148.29c.248.476.38.823.498 1.295.253 1.008.231 2.01-.059 2.581a.845.845 0 0 0-.044.098c0 .006.329.009.732.009h.73l.02-.074.036-.134c.019-.076.057-.3.088-.516.029-.217.029-1.016 0-1.258-.11-.875-.295-1.57-.597-2.226-.032-.074-.053-.138-.046-.141.008-.005.057-.074.108-.152.376-.569.607-1.284.724-2.228.031-.26.031-1.378 0-1.628-.083-.645-.182-1.082-.348-1.525a6.083 6.083 0 0 0-.329-.7l-.038-.064.131-.194c.402-.604.636-1.262.727-2.04a6.625 6.625 0 0 0-.024-1.358 5.512 5.512 0 0 0-.939-2.339 5.325 5.325 0 0 0-.95-1.02 8.097 8.097 0 0 1-.186-.152.692.692 0 0 1 .023-.208c.208-1.087.201-2.443-.017-3.503-.19-.924-.535-1.658-.98-2.082-.354-.338-.716-.482-1.15-.455-.996.059-1.8 1.205-2.116 3.01a6.805 6.805 0 0 0-.097.726c0 .036-.007.066-.015.066a.96.96 0 0 1-.149-.078A4.857 4.857 0 0 0 12 3.03c-.832 0-1.687.243-2.456.698a.958.958 0 0 1-.148.078c-.008 0-.015-.03-.015-.066a6.71 6.71 0 0 0-.097-.725C8.997 1.392 8.337.319 7.46.048a2.096 2.096 0 0 0-.585-.041Zm.293 1.402c.248.197.523.759.682 1.388.03.113.06.244.069.292.007.047.026.152.041.233.067.365.098.76.102 1.24l.002.475-.12.175-.118.178h-.278c-.324 0-.646.041-.954.124l-.238.06c-.033.007-.038-.003-.057-.144a8.438 8.438 0 0 1 .016-2.323c.124-.788.413-1.501.696-1.711.067-.05.079-.049.157.013zm9.825-.012c.17.126.358.46.498.888.28.854.36 2.028.212 3.145-.019.14-.024.151-.057.144l-.238-.06a3.693 3.693 0 0 0-.954-.124h-.278l-.119-.178-.119-.175.002-.474c.004-.669.066-1.19.214-1.772.157-.623.434-1.185.68-1.382.078-.062.09-.063.159-.012z" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wide font-sans font-bold">Ollama</span>
  </div>
);

const LogoGemini = () => (
  <div className="flex items-center gap-2 font-display font-semibold">
    {/* Official Google Gemini Sparkle */}
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wide font-sans font-medium">Google Gemini</span>
  </div>
);

const LogoAnthropic = () => (
  <div className="flex items-center gap-2 font-display font-bold">
    {/* Official Anthropic Geometric Mark */}
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
    </svg>
    <span className="text-xs sm:text-sm tracking-widest font-mono font-bold">ANTHROPIC</span>
  </div>
);

const LogoOpenAI = () => (
  <div className="flex items-center gap-2 font-display font-semibold">
    {/* Official OpenAI Swirl Logomark */}
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1635a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wide font-sans">OpenAI</span>
  </div>
);

const LogoDeepSeek = () => (
  <div className="flex items-center gap-2 font-display font-bold">
    {/* Official DeepSeek Whale Logomark */}
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.748 4.651c-.254-.124-.364.113-.512.233-.051.04-.094.09-.137.137-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.155-.708-.311-.955-.65-.172-.24-.219-.509-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.094.172.187.129.323-.082.28-.18.553-.266.833-.055.179-.137.218-.328.14a5.5 5.5 0 0 1-1.737-1.179c-.857-.828-1.631-1.743-2.597-2.46a12 12 0 0 0-.689-.47c-.985-.957.13-1.743.387-1.836.27-.098.094-.433-.778-.428-.872.003-1.67.295-2.687.685a3 3 0 0 1-.465.136 9.6 9.6 0 0 0-2.883-.101c-1.885.21-3.39 1.1-4.497 2.622C.082 8.776-.231 10.854.152 13.02c.403 2.284 1.568 4.175 3.36 5.653 1.857 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.132-.284 4.994-1.86.47.234.962.328 1.78.398.629.058 1.235-.031 1.705-.129.735-.155.684-.836.418-.961-2.155-1.004-1.682-.595-2.112-.926 1.095-1.295 2.768-3.598 3.284-6.733.05-.346.115-.834.108-1.114-.004-.171.035-.238.23-.257a4.2 4.2 0 0 0 1.545-.475c1.397-.763 1.96-2.016 2.093-3.517.02-.23-.004-.467-.247-.588M11.58 18.168c-2.088-1.642-3.101-2.183-3.52-2.16-.39.024-.32.472-.234.763.09.288.207.487.371.74.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.168-1.361-.801-2.5-1.86-3.301-3.306-.775-1.393-1.225-2.888-1.299-4.482-.02-.385.094-.522.477-.592a4.7 4.7 0 0 1 1.53-.038c2.131.311 3.946 1.264 5.467 2.774.868.86 1.525 1.887 2.202 2.89.72 1.066 1.494 2.082 2.48 2.915.348.291.626.513.892.677-.802.09-2.14.109-3.055-.615zm1.001-6.44a.306.306 0 0 1 .415-.287.3.3 0 0 1 .113.074.3.3 0 0 1 .086.214c0 .17-.136.307-.308.307a.303.303 0 0 1-.306-.307m3.11 1.596c-.2.081-.4.151-.591.16a1.25 1.25 0 0 1-.798-.254c-.274-.23-.47-.358-.551-.758a1.7 1.7 0 0 1 .015-.588c.07-.327-.007-.537-.238-.727-.188-.156-.426-.199-.689-.199a.6.6 0 0 1-.254-.078.253.253 0 0 1-.114-.358 1 1 0 0 1 .192-.21c.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.392.451.462.576.685.915.176.264.336.536.446.848.066.194-.02.353-.25.45" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wide font-sans font-bold">deepseek</span>
  </div>
);

const LogoSupabase = () => (
  <div className="flex items-center gap-2 font-display font-bold">
    {/* Official Supabase Lightning Bolt */}
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" />
    </svg>
    <span className="text-xs sm:text-sm tracking-tight font-sans font-bold lowercase">supabase</span>
  </div>
);

const LogoGitHub = () => (
  <div className="flex items-center gap-2 font-display font-semibold">
    {/* Official GitHub Octocat */}
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
    <span className="text-xs sm:text-sm tracking-tight font-sans font-medium">GitHub</span>
  </div>
);

const LogoOpenVSX = () => (
  <div className="flex items-center gap-2 font-mono font-bold">
    {/* Official Open VSX Isometric Package Box */}
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" />
      <path d="M12 11l8-4.5" />
      <path d="M12 11v9" />
      <path d="M12 11L4 6.5" />
    </svg>
    <span className="text-xs sm:text-sm tracking-wider">OPEN VSX</span>
  </div>
);

export const Sponsors = ({ activeLang = 'vi' }) => {
  const isVi = activeLang === 'vi';

  const quotesVi = [
    '⚡ ANTON SQUAD: CHẠY BẰNG CÀ PHÊ & KHÔNG BAO GIỜ MẤT TRÍ NHỚ!',
    '🚀 DECOUPLED BRAIN: TÁCH BIỆT KHỎI IDE SANDBOX VỚI 0% MEMORY LOSS!',
    '🛠️ PLAN-FIRST ENGINEERING: LẬP KẾ HOẠCH CHUẨN XÁC TRƯỚC KHI CODE!',
    '🤖 AGENTIC PIPERNET: SQUAD PHỐI HỢP TỰ ĐỘNG CHUẨN KẾT NỐI MCP!',
  ];

  const quotesEn = [
    '⚡ ANTON SQUAD: POWERED BY COFFEE & ZERO CONTEXT AMNESIA!',
    '🚀 DECOUPLED BRAIN: INDEPENDENT DAEMON WITH 0% MEMORY LOSS!',
    '🛠️ PLAN-FIRST ENGINEERING: RIGOROUS PIPELINES BEFORE SYNTHESIS!',
    '🤖 AGENTIC PIPERNET: AUTONOMOUS SQUAD MESH OVER OPEN MCP!',
  ];

  const quotes = isVi ? quotesVi : quotesEn;
  const quotesLoop = [...quotes, ...quotes, ...quotes, ...quotes];

  const sponsorsList = [
    { id: 'unikorn', component: <LogoUnikorn />, url: 'https://unikorn.vn' },
    { id: 'i2flabs', component: <LogoI2FLabs />, url: '#' },
    { id: 'antigravity', component: <LogoAntigravity />, url: '#' },
    { id: 'cursor', component: <LogoCursor />, url: 'https://cursor.com' },
    { id: 'claude', component: <LogoClaude />, url: 'https://claude.ai' },
    { id: 'mcp', component: <LogoMCP />, url: 'https://modelcontextprotocol.io' },
    { id: 'ollama', component: <LogoOllama />, url: 'https://ollama.ai' },
    { id: 'gemini', component: <LogoGemini />, url: 'https://deepmind.google/technologies/gemini/' },
    { id: 'anthropic', component: <LogoAnthropic />, url: 'https://anthropic.com' },
    { id: 'openai', component: <LogoOpenAI />, url: 'https://openai.com' },
    { id: 'deepseek', component: <LogoDeepSeek />, url: 'https://deepseek.com' },
    { id: 'supabase', component: <LogoSupabase />, url: 'https://supabase.com' },
    { id: 'github', component: <LogoGitHub />, url: 'https://github.com' },
    { id: 'openvsx', component: <LogoOpenVSX />, url: 'https://open-vsx.org' },
    { 
      id: 'sponsor_callout', 
      isCallout: true, 
      url: 'https://github.com/hainguyen011' 
    },
  ];

  const antonStickers = [
    { sticker: anHi, name: 'Anton Hi' },
    { sticker: anLover, name: 'Anton Lover' },
    { sticker: anLover2, name: 'Anton Heart' },
    { sticker: anHipe, name: 'Anton Hipe' },
    { sticker: anCurios, name: 'Anton Curios' },
    { sticker: anAngry, name: 'Anton Angry' },
    { sticker: anLoading, name: 'Anton Loading' },
    { sticker: anByebye, name: 'Anton ByeBye' },
  ];

  const stickersLoop = [...antonStickers, ...antonStickers];

  return (
    <div id="orchestration" className="border-subtle-b bg-[#0B0B11]">
      
      {/* 1. Header Row (Optical Golden Ratio Balance) */}
      <div className="section-header-optical text-center border-subtle-b bg-[#0B0B11] border-scan">
        <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-widest uppercase">
          {isVi ? 'ĐỒNG HÀNH & HỆ SINH THÁI' : 'SPONSORS & ECOSYSTEM'}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2 font-display">
          {isVi ? (
            <>Đồng Hành <span className="text-cyan-400">Phát Triển</span></>
          ) : (
            <>Ecosystem <span className="text-cyan-400">& Partners</span></>
          )}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
          {isVi
            ? 'Aevum OS liên kết các mô hình AI hàng đầu, IDE thông minh và chuẩn giao thức Model Context Protocol mã nguồn mở.'
            : 'Aevum OS bridges premier LLMs, intelligent developer platforms, and open Model Context Protocols.'}
        </p>
      </div>

      {/* 2. Precision Hairline Logo Wall (Flat, Matte, Thin 1px Borders, Zero Glare) */}
      <div>

        {/* 5-Column Precision Hairline Grid (Exact 1px Thin Lines, Zero Duplication) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b border-subtle bg-[#0B0B11]">
          {sponsorsList.map((item) => {
            if (item.isCallout) {
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={isVi ? "Tài trợ Aevum OS" : "Sponsor Aevum OS"}
                  className="sponsor-grid-cell h-24 sm:h-28 flex items-center justify-center p-5 bg-[#0B0B11] hover:bg-[#0f1018] text-slate-400/70 hover:text-cyan-400 transition-colors duration-200 select-none group"
                >
                  <span className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase transition-transform duration-200 group-hover:scale-[1.03]">
                    {isVi ? 'TÀI TRỢ' : 'SPONSOR'}
                  </span>
                </a>
              );
            }

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.id}
                aria-label={`Đối tác ${item.id}`}
                className="sponsor-grid-cell h-24 sm:h-28 flex items-center justify-center p-5 bg-[#0B0B11] hover:bg-[#0f1018] text-slate-400/60 hover:text-slate-200 transition-colors duration-200 select-none group"
              >
                <div className="transition-transform duration-200 group-hover:scale-[1.03]">
                  {item.component}
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* 3. Infinite Ticker Bar (Matte, Running Text Quotes) */}
      <div className="relative overflow-hidden border-subtle-b bg-[#0B0B11] py-3">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 marquee-fade-left z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 marquee-fade-right z-10" />

        <div className="animate-marquee gap-12 flex whitespace-nowrap items-center">
          {quotesLoop.map((q, idx) => (
            <span 
              key={idx}
              className="font-mono text-[11px] text-slate-300 font-medium uppercase tracking-widest flex items-center shrink-0"
            >
              {q}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Infinite Running Stickers (Matte Flat Stickers of An, Zero Shadow) */}
      <div className="relative overflow-hidden bg-[#0B0B11] py-8 group">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 marquee-fade-left z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 marquee-fade-right z-10" />

        <div className="animate-marquee-reverse gap-12 sm:gap-16 px-4 items-center flex">
          {stickersLoop.map((item, idx) => (
            <div 
              key={idx}
              className="flex-shrink-0 flex items-center justify-center py-2 transition-transform duration-200 hover:scale-110 cursor-pointer"
            >
              <img 
                src={item.sticker} 
                alt={item.name} 
                loading="lazy"
                decoding="async"
                width="144"
                height="144"
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain shadow-none"
                style={{ boxShadow: 'none', filter: 'none' }}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Sponsors;
