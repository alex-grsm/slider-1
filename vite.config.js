import { defineConfig } from 'vite';
import path from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import legacy from '@vitejs/plugin-legacy';
import htmlMinifier from 'vite-plugin-html-minifier-terser';
// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  base: './',  // Указывает базовый путь для сборки (относительный путь)
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const ext = path.extname(assetInfo.name).toLowerCase();
          const name = path.basename(assetInfo.name, ext);

          // Распределяет ресурсы по соответствующим директориям в зависимости от типа файла
          if (['.png', '.jpg', '.jpeg', '.svg', '.gif', '.tiff', '.bmp', '.ico', '.webp', '.mp4'].includes(ext)) {
            return `assets/img/${name}${ext}`;  // Изображения и видео помещаем в директорию img
          }
          if (['.woff', '.woff2', '.eot', '.ttf', '.otf'].includes(ext)) {
            return `assets/fonts/${name}${ext}`;  // Шрифты помещаем в директорию fonts
          }
          if (ext === '.css') {
            return `assets/css/${name}${ext}`;  // CSS-файлы помещаем в директорию css
          }
          return `assets/js/${name}${ext}`;  // Остальные файлы (JS, JSON и т.д.) → в директорию js
        },
        chunkFileNames: 'assets/js/[name].js',    // Задает путь для чанков (разделенных JS-файлов)
        entryFileNames: 'assets/js/[name].js',    // Задает путь для файлов точек входа
      },
    },
    // Включаем встроенные оптимизации Vite
    minify: 'terser',              // Использует Terser вместо стандартного минификатора esbuild (более гибкий)
    terserOptions: {
      compress: {
        drop_console: true,        // Удаляет все console.* вызовы из итогового кода
        drop_debugger: true,       // Удаляет все операторы debugger из итогового кода
      },
    },
  },
  css: {
    postcss: './postcss.config.js',  // Указывает путь к конфигурации PostCSS для обработки CSS
  },
  plugins: [
    ViteImageOptimizer({
      png: {
        quality: 80,              // Устанавливает качество PNG в 80% (баланс между размером и качеством)
      },
      jpeg: {
        quality: 80,              // Устанавливает качество JPEG в 80%
      },
      jpg: {
        quality: 80,              // Устанавливает качество JPG в 80%
      },
      webp: {
        lossless: true,           // Использует сжатие webp без потерь (сохраняет оригинальное качество)
      },
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],  // Добавляет поддержку старых браузеров, исключая IE 11
    }),
    // Добавляем плагин html-minifier-terser для минификации HTML
    htmlMinifier({
        minify: true
    }),
    // visualizer(),
  ],
});