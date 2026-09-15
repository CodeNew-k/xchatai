/* 星叶AI · 全站交互
   1) 黑白主题切换（localStorage 记忆，默认跟随系统）
   2) 移动端导航开关
   3) 页脚年份自动更新
*/
(function () {
  'use strict';

  var KEY = 'xchatai-theme';

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme');
  }

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem(KEY, t); } catch (e) { /* 隐私模式下忽略 */ }
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* 忽略 */ }
  if (!saved) {
    saved = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  applyTheme(saved);

  var toggle = document.getElementById('themeToggle');
  var hint = document.getElementById('themeHint');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      if (hint) {
        hint.textContent = next === 'dark' ? '已切换到深色模式' : '已切换到浅色模式';
        hint.classList.add('show');
        clearTimeout(toggle._t);
        toggle._t = setTimeout(function () { hint.classList.remove('show'); }, 1600);
      }
    });
  }

  var navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    var links = document.querySelectorAll('.site-nav a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
