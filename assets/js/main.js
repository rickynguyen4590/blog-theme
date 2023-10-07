import hljs from 'highlight.js';
import CopyButtonPlugin from './copy';

function idle(cb, time) {
  time = time || 500 + Math.random() * 2500
  setTimeout(cb, time);
}

function idleLong(cb, time) {
  time = time || 1500 + Math.random() * 4000
  setTimeout(cb, time);
}


function loadFb() {
  const script = document.createElement('script');
  script.crossOrigin = "anonymous";
  script.async = true;
  script.nonce = "hRevMNbZ";
  script.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v9.0&appId=429146018231335";
  document.getElementsByTagName('head')[0].appendChild(script);
}

function loadGG() {
  const script = document.createElement('script');
  script.crossOrigin = "anonymous";
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-XZG88T09VQ";
  document.getElementsByTagName('head')[0].appendChild(script);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', 'G-XZG88T09VQ');
}

function highlight() {
  hljs.addPlugin(new CopyButtonPlugin())
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block);
  });
}

(function () {
  pagination()
  idleLong(loadFb);
  idleLong(loadGG, 10);
  idle(highlight, 10);

  if (!document.body.classList.contains('post-template')) return;

  const cover = document.querySelector('.gh-cover');
  if (!cover) return;

  const image = cover.querySelector('.gh-cover-image');

  window.addEventListener('load', function () {
    cover.style.setProperty('--cover-height', image.clientWidth * image.naturalHeight / image.naturalWidth + 'px');
    cover.classList.remove('loading');
  });
})();
