importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@4.3.0/workbox/workbox-sw.js')

// --------------------------------------------------
// Configure
// --------------------------------------------------

// Set workbox config
workbox.setConfig({
  "debug": false
})

// Start controlling any existing clients as soon as it activates
workbox.core.clientsClaim()

// Skip over the SW waiting lifecycle stage
workbox.core.skipWaiting()

workbox.precaching.cleanupOutdatedCaches()

// --------------------------------------------------
// Precaches
// --------------------------------------------------

// Precache assets

workbox.precaching.precacheAndRoute([
  "/404.html"
], {
  "cacheId": "WhoIsJan-prod",
  "directoryIndex": "/"
})

// --------------------------------------------------
// Runtime Caching
// --------------------------------------------------

// Register route handlers for runtimeCaching
workbox.routing.registerRoute(new RegExp('/_nuxt/(?!.*(__webpack_hmr|hot-update))'), new workbox.strategies.CacheFirst ({}), 'GET')

// Register router handler for offlinePage
workbox.routing.registerRoute(new RegExp('/(?!.*(__webpack_hmr|hot-update))'), ({event}) => {
  return new workbox.strategies.NetworkOnly().handle({event})
    .catch(() => caches.match('/404.html'))
})
