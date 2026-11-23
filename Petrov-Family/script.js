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