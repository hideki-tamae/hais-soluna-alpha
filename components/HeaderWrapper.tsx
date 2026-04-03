// 'use client';

// import { usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import MobileAuthButton from "./MobileAuthButton";

// export default function HeaderWrapper() {
//   const pathname = usePathname();
//   const [mounted, setMounted] = useState(false);
//   const hoverColorClass = "hover:text-cyan-400";

//   // 画面表示後の不整合を防ぐため
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // if (!mounted) return null;


//   // 🚨 修正：現在のURLに /hais や /v3 が含まれているか「だけ」で判定
//   // これにより、記憶（Storage）に頼らず、今のページに合わせた戻り先になります
//   const isHaisMode = pathname?.includes('/hais');
//   const isV3Mode = pathname?.includes('/v3');

//   let logoHref = '/';
//   if (isHaisMode) logoHref = '/hais';
//   else if (isV3Mode) logoHref = '/v3';

//   return (
//     <header className="w-full border-b border-white/10 bg-[#05070A]/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
//       <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">

//         <Link
//           href={logoHref}
//           className={`flex items-center gap-4 opacity-100 ${hoverColorClass} transition-colors group`}
//         >
//           <div className="h-16 w-16 transition-transform group-hover:scale-105 rounded-full overflow-hidden">
//             <img
//               src="https://huggingface.co/spaces/JonesHideki/hais-polyvagal/resolve/main/public/cyber-cross-logo.png"
//               alt="Cyber Cross Logo"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <span className="text-white font-bold tracking-widest text-sm md:text-base uppercase hidden md:block">
//             ACES CARE HUB JAPAN
//           </span>
//         </Link>

//         <nav className="flex items-center gap-4 whitespace-nowrap">
//           {/* 🚨 元のボタン構成を維持 */}
//           {/* <div className="hidden md:block rounded-md border border-transparent hover:border-cyan-400 transition-colors">
//             <a
//               href="https://tally.so/r/wM9JVY"
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`text-sm font-bold text-gray-300 ${hoverColorClass} transition-colors tracking-wider px-3 py-1`}
//             >
//               共創参加
//             </a>
//           </div> */}
//           {/* <div className="hidden md:block rounded-md border border-transparent hover:border-cyan-400 transition-colors">
//             <a
//               href="https://soluna-lp.vercel.app/tester-claim"
//               target="_blank" 
//               rel="noopener noreferrer"
//               className={`text-sm font-bold text-gray-300 ${hoverColorClass} transition-colors tracking-wider px-3 py-1`}
//             >
//               読者限定
//             </a>
//           </div> */}
//           <div className="ml-2">
//             <MobileAuthButton />
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// }


'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import MobileAuthButton from "./MobileAuthButton";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const hoverColorClass = "hover:text-cyan-400";

  useEffect(() => {
    setMounted(true);
  }, []);

  // マウント完了まで何も出さない（Hydration Error防止）
  // Project ID設定が正常化したため、この安全装置を戻してもロゴは消えません
  if (!mounted) return null;

  const isHaisMode = pathname?.includes('/hais');
  const isV3Mode = pathname?.includes('/v3');

  let logoHref = '/';
  if (isHaisMode) logoHref = '/hais';
  else if (isV3Mode) logoHref = '/v3';

  return (
    <header className="w-full border-b border-white/10 bg-[#05070A]/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">

        <Link
          href={logoHref}
          className={`flex items-center gap-4 opacity-100 ${hoverColorClass} transition-colors group`}
        >
          <div className="h-16 w-16 transition-transform group-hover:scale-105 rounded-full overflow-hidden">
            <img
              src="https://huggingface.co/spaces/JonesHideki/hais-polyvagal/resolve/main/public/cyber-cross-logo.png"
              alt="Cyber Cross Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <span className="text-white font-bold tracking-widest text-sm md:text-base uppercase hidden md:block">
            ACES CARE HUB JAPAN
          </span>
        </Link>

        <nav className="flex items-center gap-4 whitespace-nowrap">
          <div className="ml-2">
            <MobileAuthButton />
          </div>
        </nav>
      </div>
    </header>
  );
}