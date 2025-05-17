import '../css/app.css'

import { createInertiaApp, router } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'
import { route as routeFn } from 'ziggy-js'

// Define interface for the event detail
interface InertiaBeforeEvent {
  detail: {
    visit: {
      headers: Record<string, string>;
    };
  };
}

router.on('before', (event: InertiaBeforeEvent) => {
  const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (token) {
    event.detail.visit.headers['X-CSRF-TOKEN'] = token;
  }
});

// ประกาศ type สำหรับ Ziggy
declare global {
  const route: typeof routeFn;
}

const appName = import.meta.env.VITE_APP_NAME || 'Laventory'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />)
  },
  progress: {
    color: '#4B5563',
  },
})
