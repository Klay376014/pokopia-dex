<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen">
    <nav class="app-nav">
      <div class="nav-inner max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
        <span class="nav-logo font-[Outfit,'PingFang_TC',sans-serif] font-800 text-primary tracking-[-0.02em]">Pokopia</span>
        <div class="flex gap-1">
          <RouterLink to="/" class="nav-link">圖鑑</RouterLink>
          <RouterLink to="/maps" class="nav-link">地圖配置</RouterLink>
        </div>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'DM Sans', 'PingFang TC', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: oklch(0.985 0.005 27);
  background-image:
    radial-gradient(ellipse at 20% 50%, oklch(0.96 0.015 145 / 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, oklch(0.96 0.01 27 / 0.2) 0%, transparent 40%);
  background-attachment: fixed;
  color: oklch(0.22 0.02 27);
}

.pokeball-watermark::after {
  content: '';
  position: absolute;
  top: 50%;
  left: -5px;
  right: -5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.6);
  transform: translateY(-50%);
}
</style>

<style scoped>
.app-nav {
  height: 48px;
  background: white;
  border-bottom: 1px solid oklch(0.92 0.01 27);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px oklch(0 0 0 / 0.06);
}

.nav-logo {
  font-size: 1.1rem;
  color: oklch(0.55 0.22 27);
}

.nav-link {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: oklch(0.45 0.02 27);
  text-decoration: none;
  position: relative;
  transition: color 0.15s;
}

.nav-link:hover {
  color: oklch(0.22 0.02 27);
  background: oklch(0.97 0.005 27);
}

.nav-link.router-link-active {
  color: oklch(0.55 0.22 27);
  font-weight: 600;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 8px;
  right: 8px;
  height: 2px;
  background: oklch(0.55 0.22 27);
  border-radius: 2px;
}
</style>
