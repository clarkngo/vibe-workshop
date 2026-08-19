/* Vibe Workshop — shared nav/sidebar/theme logic. One localStorage key,
   loaded by every page. Builds the sidebar from whatever the page provides:
   - headings inside <main class="content"> -> "On This Page"
   - <ul id="objectives"> -> "Objectives Progress" (checkboxes persisted per-module)
   - <table id="key-terms"> -> "Key Terms" mini glossary
*/
(function () {
  "use strict";
  var THEME_KEY = "vibe-workshop-theme";

  function applyTheme(theme) {
    if (theme === "dark" || theme === "light") {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  function currentTheme() {
    var stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  applyTheme(localStorage.getItem(THEME_KEY));

  function wireThemeToggle() {
    var btn = document.querySelector("[data-action='toggle-theme']");
    if (!btn) return;
    var sync = function () {
      var t = currentTheme();
      btn.textContent = t === "dark" ? "☀ Light" : "🌙 Dark";
    };
    sync();
    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
      sync();
    });
  }

  function wirePrintButton() {
    var btn = document.querySelector("[data-action='print']");
    if (!btn) return;
    btn.addEventListener("click", function () { window.print(); });
  }

  function slugify(text) {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function buildOnThisPage(sidebar) {
    var content = document.querySelector("main.content");
    if (!content) return;
    var heads = content.querySelectorAll("section.block > .sec-head h2");
    if (!heads.length) return;
    var card = document.createElement("div");
    card.className = "side-card";
    var h5 = document.createElement("h5");
    h5.textContent = "On This Page";
    card.appendChild(h5);
    var ul = document.createElement("ul");
    ul.className = "side-toc";
    heads.forEach(function (h) {
      var section = h.closest("section.block");
      if (!section.id) section.id = slugify(h.textContent);
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + section.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      ul.appendChild(li);
    });
    card.appendChild(ul);
    sidebar.appendChild(card);
  }

  function moduleKey() {
    return "vibe-workshop-progress:" + (document.body.getAttribute("data-module-id") || location.pathname);
  }

  function buildObjectivesProgress(sidebar) {
    var list = document.getElementById("objectives");
    if (!list) return;
    var items = Array.prototype.slice.call(list.querySelectorAll("li"));
    if (!items.length) return;

    var storeKey = moduleKey();
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(storeKey) || "{}"); } catch (e) { saved = {}; }

    var card = document.createElement("div");
    card.className = "side-card";
    var h5 = document.createElement("h5");
    h5.textContent = "Objectives Progress";
    card.appendChild(h5);

    var track = document.createElement("div");
    track.className = "progress-bar-track";
    var fill = document.createElement("div");
    fill.className = "progress-bar-fill";
    track.appendChild(fill);
    card.appendChild(track);

    var ul = document.createElement("ul");
    items.forEach(function (li, i) {
      var row = document.createElement("li");
      row.className = "progress-item";
      var cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !!saved[i];
      var span = document.createElement("span");
      span.textContent = li.textContent;
      row.appendChild(cb);
      row.appendChild(span);
      if (cb.checked) row.classList.add("done");
      cb.addEventListener("change", function () {
        saved[i] = cb.checked;
        localStorage.setItem(storeKey, JSON.stringify(saved));
        row.classList.toggle("done", cb.checked);
        updateFill();
      });
      ul.appendChild(row);
      row.appendChild(document.createElement("br"));
      row.removeChild(row.lastChild);
    });
    card.appendChild(ul);
    sidebar.appendChild(card);

    function updateFill() {
      var done = items.filter(function (_, i) { return !!saved[i]; }).length;
      fill.style.width = Math.round((done / items.length) * 100) + "%";
    }
    updateFill();
  }

  function buildGlossary(sidebar) {
    var table = document.getElementById("key-terms");
    if (!table) return;
    var rows = Array.prototype.slice.call(table.querySelectorAll("tbody tr"));
    if (!rows.length) return;
    var card = document.createElement("div");
    card.className = "side-card";
    var h5 = document.createElement("h5");
    h5.textContent = "Key Terms";
    card.appendChild(h5);
    rows.forEach(function (tr) {
      var cells = tr.querySelectorAll("td");
      if (cells.length < 2) return;
      var div = document.createElement("div");
      div.className = "glossary-term";
      var b = document.createElement("b");
      b.textContent = cells[0].textContent;
      var span = document.createElement("span");
      span.textContent = cells[1].textContent;
      div.appendChild(b);
      div.appendChild(span);
      card.appendChild(div);
    });
    sidebar.appendChild(card);
  }

  function buildSidebar() {
    var sidebar = document.querySelector("aside.sidebar");
    if (!sidebar) return;
    buildOnThisPage(sidebar);
    buildObjectivesProgress(sidebar);
    buildGlossary(sidebar);
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireThemeToggle();
    wirePrintButton();
    buildSidebar();
  });
})();
