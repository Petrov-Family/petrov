// ضع رابط الـ Webhook الخاص بديسكورد العائلة هنا بين علامتي التنصيص
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1574092816143876278/m9II7wJZ2jevBCq40J1WXsnYRgSeDqBv4FlNlZ9aaRTMbiI_g1nsW4OSuzPQZ5PD1QUp";

document.getElementById("applicationForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const statusMsg = document.getElementById("formStatus");

    // جلب البيانات من الحقول
    const rpName = document.getElementById("rpName").value;
    const discordTag = document.getElementById("discordTag").value;
    const age = document.getElementById("age").value;
    const experience = document.getElementById("experience").value;
    const reason = document.getElementById("reason").value;

    // تغيير حالة الزر أثناء الإرسال
    submitBtn.disabled = true;
    submitBtn.innerText = "جاري إرسال طلبك...";

    // تجهيز رسالة الديسكورد الفخمة (Embed)
    const payload = {
        username: "Petrov Family | نظام التوظيف",
        embeds: [{
            title: "📜 طلب انضمام جديد لعائلة بيتروف",
            color: 13938487, // اللون الذهبي
            fields: [
                { name: "👤 الاسم داخل السيرفر (RP)", value: rpName, inline: true },
                { name: "💬 يوزر الديسكورد", value: discordTag, inline: true },
                { name: "🎂 العمر الحقيقي", value: age, inline: true },
                { name: "🎮 الخبرة في MTA / RP", value: experience, inline: false },
                { name: "📝 لماذا تريد الانضمام للعائلة؟", value: reason, inline: false }
            ],
            footer: {
                text: "WnashTime RP • Petrov Family Official Website"
            },
            timestamp: new Date()
        }]
    };

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            statusMsg.style.color = "#22c55e";
            statusMsg.innerText = "✅ تم إرسال طلبك بنجاح إلى قيادة العائلة! سيتم الرد عليك في الديسكورد قريباً.";
            document.getElementById("applicationForm").reset();
        } else {
            throw new Error("فشل الإرسال");
        }
    } catch (error) {
        statusMsg.style.color = "#ef4444";
        statusMsg.innerText = "❌ حدث خطأ! تأكد من وضع رابط Webhook صحيح في ملف script.js.";
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "إرسال الطلب الآن";
    }
});
(function initPetrovTiersProgress() {
  const grid = document.getElementById("pvTiersGrid");
  if (!grid) return;

  const cards = grid.querySelectorAll(".pv-tier-card");

  function animateCard(card) {
    if (card.dataset.animated === "true") return;
    card.dataset.animated = "true";

    const fill = card.querySelector(".pv-progress-fill");
    const pctEl = card.querySelector(".pv-pct-value");
    if (!fill || !pctEl) return;

    const target = Math.max(0, Math.min(100, Number(fill.dataset.progress || 0)));
    requestAnimationFrame(() => {
      fill.style.width = target + "%";
    });

    const duration = 1000;
    const start = performance.now();

    function step(now) {
      const progress = Math.min(1, (now - start) / duration);
      const currentVal = Math.round(target * progress);
      pctEl.textContent = currentVal + "%";
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCard(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    cards.forEach((card) => observer.observe(card));
  } else {
    cards.forEach(animateCard);
  }
})();
(function () {
  const bars = document.querySelectorAll("#pvTiersGrid .tier-bar");
  if (!bars.length) return;

  setTimeout(() => {
    bars.forEach((bar) => {
      const pct = bar.getAttribute("data-progress") || "0";
      bar.style.width = pct + "%";
    });
  }, 150);
})();
(function () {
  const cards = document.querySelectorAll("#pvTiersGrid .tier-card");
  if (!cards.length) return;

  setTimeout(() => {
    cards.forEach((card) => {
      const bar = card.querySelector(".tier-bar");
      const pctLabel = card.querySelector(".tier-pct");
      if (!bar || !pctLabel) return;

      const target = Number(bar.getAttribute("data-progress") || 0);
      bar.style.width = target + "%";
      pctLabel.textContent = target + "%";
    });
  }, 150);
})();
(function initVaultHoverSpotlight() {
  const grid = document.getElementById("pvTiersGrid");
  if (!grid) return;

  const cards = grid.querySelectorAll(".tier-card");

  grid.addEventListener("pointerenter", () => {
    grid.classList.add("is-hovering");
  });

  grid.addEventListener("pointerleave", () => {
    grid.classList.remove("is-hovering");
  });

  cards.forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
    });
  });
})();