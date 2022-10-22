<template>
  <g>
    <defs>

      <linearGradient id="fil0"><stop offset="0" stop-color="#280b4b" /></linearGradient>
      <linearGradient id="fil2"><stop offset="0" stop-color="#2b0c50" /></linearGradient>
      <linearGradient id="fil1"><stop offset="0" stop-color="#2e0d56" /></linearGradient>
      <linearGradient id="fil3"><stop offset="0" stop-color="#310e5b" /></linearGradient>
      <linearGradient id="fil4"><stop offset="0" stop-color="#340f61" /></linearGradient>
      <linearGradient id="fil7"><stop offset="0" stop-color="#3a116d" /></linearGradient>
      <linearGradient id="fil5"><stop offset="0" stop-color="#3d1273" /></linearGradient>
      <linearGradient id="fil6"><stop offset="0" stop-color="#5b1aaa" /></linearGradient>
      <linearGradient id="fil8"><stop offset="0" stop-color="#5c1aae" /></linearGradient>

      <linearGradient id="engineGradient"
        gradientTransform="rotate(90)"
        x1="0%" y1="0%" x2="100%" y2="0">
        <stop offset="0%" stop-color="#888888" stop-opacity="0.8"/>
        <stop offset="3%" stop-color="#ffffff" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </linearGradient>

      <radialGradient id="starGradient">
        <stop offset="20%" stop-color="#c3b3da"/>
        <stop offset="75%" stop-color="#d4c4eb"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </radialGradient>

      <radialGradient id="glowingGradient">
        <stop offset="0%" stop-color="#ffffff"  stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#ffffff"  stop-opacity="0.0"/>
      </radialGradient>

      <radialGradient  id="planetGradient" cx="10%" cy="50%" r="180%" fx="0%" fy="50%">
        <stop offset="0%" style="stop-color:#e5cfff;stop-opacity:1" />
        <stop offset="10%" style="stop-color:#e5cfff;stop-opacity:1" />
        <stop offset="20%" style="stop-color:#c3b3da;stop-opacity:1" />
        <stop offset="30%" style="stop-color:rgb(140,120,180);stop-opacity:1" />
        <stop offset="40%" style="stop-color:rgb(60,40,90);stop-opacity:1" />
        <stop offset="100%" style="stop-color:rgb(60,40,90);stop-opacity:1" />
      </radialGradient>

      <linearGradient id="ringGradient"
        x1="100%" y1="100%" x2="-100%" y2="-100%" gradientTransform="rotate(135)">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
          <stop offset="10%" stop-color="#ffffff" stop-opacity="1"/>
          <stop offset="20%" stop-color="#ffffff" stop-opacity="0.5"/>
          <stop offset="70%" stop-color="#ffffff" stop-opacity="0.1"/>
          <stop offset="90%" stop-color="#000000" stop-opacity="0.1"/>
      </linearGradient>

      <filter id="glowing" >
        <feGaussianBlur in="source" stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="blurcolor" />
        </feMerge>
      </filter>

    </defs>
  </g>
</template>


