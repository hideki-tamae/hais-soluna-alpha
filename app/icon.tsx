import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Simplified Modern Kamon Logo for Small Scales */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="favGradient" x1="0" y1="0" x2="100" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34d399" /> {/* Emerald */}
              <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
            </linearGradient>
          </defs>

          {/* Outer Shield - Thick Stroke for Visibility */}
          <path
            d="M50 5 L90 25 V65 C90 95 50 115 50 115 C50 115 10 95 10 65 V25 L50 5 Z"
            stroke="url(#favGradient)"
            strokeWidth="12"
            fill="none"
          />

          {/* Core Dot - Solid Color */}
          <circle cx="50" cy="60" r="12" fill="#06b6d4" />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}