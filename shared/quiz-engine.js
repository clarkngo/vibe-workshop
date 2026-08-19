/* Vibe Workshop — shared grading + progress-tracking logic.
   Quiz markup contract (per .quiz-item):
     <div class="quiz-item" data-quiz-item>
       <div class="q-text">...</div>
       <label class="q-opt"><input type="radio" name="qN" data-correct="true|false"> text</label>
       ...
       <div class="quiz-feedback" data-correct-msg="..." data-incorrect-msg="..."></div>
     </div>
   Matching markup contract (per .match-row):
     <div class="match-row" data-answer="correct-option-value">
       <span class="prompt-text">...</span>
       <select>...</select>
       <div class="match-feedback ok">...</div>
       <div class="match-feedback bad">...</div>
     </div>
*/
(function () {
  "use strict";

  function gradeQuiz(form) {
    var items = form.querySelectorAll(".quiz-item[data-quiz-item]");
    var correctCount = 0;
    items.forEach(function (item) {
      var picked = item.querySelector("input[type='radio']:checked");
      var fb = item.querySelector(".quiz-feedback");
      item.classList.remove("correct", "incorrect");
      item.classList.add("answered");
      if (!picked) {
        item.classList.remove("answered");
        return;
      }
      var isCorrect = picked.getAttribute("data-correct") === "true";
      item.classList.add(isCorrect ? "correct" : "incorrect");
      if (isCorrect) correctCount++;
      if (fb) {
        fb.textContent = isCorrect
          ? (fb.getAttribute("data-correct-msg") || "Correct.")
          : (fb.getAttribute("data-incorrect-msg") || "Not quite — review the section above.");
      }
    });
    var scoreEl = form.querySelector(".quiz-score");
    if (scoreEl) {
      scoreEl.textContent = "Score: " + correctCount + " / " + items.length;
    }
    var storeKey = "vibe-workshop-quiz:" + (document.body.getAttribute("data-module-id") || location.pathname);
    localStorage.setItem(storeKey, JSON.stringify({ score: correctCount, total: items.length, at: Date.now() }));
    return { correct: correctCount, total: items.length };
  }

  function checkMapping(container) {
    var rows = container.querySelectorAll(".match-row");
    var correctCount = 0;
    rows.forEach(function (row) {
      var select = row.querySelector("select");
      var answer = row.getAttribute("data-answer");
      row.classList.remove("correct", "incorrect");
      if (!select || !select.value) return;
      var ok = select.value === answer;
      row.classList.add(ok ? "correct" : "incorrect");
      if (ok) correctCount++;
    });
    var scoreEl = container.querySelector(".match-score");
    if (scoreEl) scoreEl.textContent = correctCount + " / " + rows.length + " matched correctly";
    return { correct: correctCount, total: rows.length };
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("form[data-quiz]").forEach(function (form) {
      var btn = form.querySelector("[data-action='grade-quiz']");
      if (btn) btn.addEventListener("click", function (e) { e.preventDefault(); gradeQuiz(form); });
    });
    document.querySelectorAll("[data-activity='match']").forEach(function (container) {
      var btn = container.querySelector("[data-action='check-mapping']");
      if (btn) btn.addEventListener("click", function (e) { e.preventDefault(); checkMapping(container); });
    });
  });

  window.VibeQuiz = { gradeQuiz: gradeQuiz, checkMapping: checkMapping };
})();
