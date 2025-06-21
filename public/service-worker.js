// Basic service worker using Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.routing.registerRoute(
  ({ request }) => request.destination === 'document' || 
                   request.destination === 'script' || 
                   request.destination === 'style',
  new workbox.strategies.StaleWhileRevalidate()
);