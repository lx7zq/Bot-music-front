<template>
  <div class="app-root min-h-screen bg-[#0a0a12] font-sans text-zinc-100">
    <div class="max-w-3xl mx-auto px-6 py-12">
      <RouterLink to="/" class="text-sm text-zinc-400 hover:text-zinc-100">← กลับหน้าแรก</RouterLink>

      <h1 class="mt-4 text-3xl font-bold tracking-tight">ข้อกำหนดการให้บริการ (Terms of Service)</h1>
      <p class="mt-2 text-sm text-zinc-500">ไอแว่น 🐻 DJ — Discord Music Bot • อัปเดตล่าสุด: 23 กันยายน 2026</p>

      <div class="glass-panel mt-8 p-6 sm:p-8 space-y-6 text-sm leading-relaxed text-zinc-300">
        <section>
          <h2 class="text-base font-semibold text-zinc-100">1. บริการที่เรามีให้</h2>
          <p class="mt-2">ไอแว่น เป็นบอทเพลงสำหรับ Discord ที่ช่วยเปิดเพลงใน Voice Channel, จัดคิวเพลง, และควบคุมผ่านคำสั่ง Slash Command (/play, /search, /skip, /queue ฯลฯ) และผ่านหน้า Dashboard บนเว็บไซต์นี้ การใช้บอทถือว่าคุณยอมรับข้อกำหนดฉบับนี้</p>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">2. การใช้งานที่ยอมรับได้</h2>
          <ul class="mt-2 list-disc pl-5 space-y-1">
            <li>ต้องใช้งานตาม <a class="underline" href="https://discord.com/terms" target="_blank" rel="noopener">Discord Terms of Service</a> และ <a class="underline" href="https://discord.com/guidelines" target="_blank" rel="noopener">Community Guidelines</a></li>
            <li>ห้ามใช้บอทเพื่อสแปม, ก่อกวน, ละเมิดลิขสิทธิ์อย่างจงใจ, หรือกระทำผิดกฎหมาย</li>
            <li>ห้ามพยายามเจาะระบบ, ยิง request รัว ๆ (abuse / rate-limit evasion), หรือดัดแปลงบอทโดยไม่ได้รับอนุญาต</li>
            <li>เจ้าของเซิร์ฟเวอร์ (admin) รับผิดชอบการอนุญาตให้สมาชิกใช้บอทในเซิร์ฟเวอร์ของตน</li>
          </ul>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">3. ลิขสิทธิ์เนื้อหา</h2>
          <p class="mt-2">บอทดึงเสียงจากแหล่งสาธารณะ (เช่น YouTube) ตามคำขอของผู้ใช้ เราไม่ได้เป็นเจ้าของและไม่ได้เก็บสำเนาเพลงไว้ ผู้ใช้ต้องรับผิดชอบว่าเนื้อหาที่ขอให้เปิดไม่ละเมิดลิขสิทธิ์ หากเจ้าของสิทธิ์ร้องขอ เราจะลบหรือบล็อกเนื้อหานั้น</p>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">4. ความพร้อมของบริการ</h2>
          <p class="mt-2">บริการให้ใช้ฟรีแบบ "ตามสภาพ" (as-is) ไม่รับประกันว่าจะออนไลน์ตลอดเวลา เพลงจะเล่นไม่สะดุด หรือข้อมูลจะไม่หาย เราอาจหยุด ปรับปรุง หรือจำกัดการใช้งานชั่วคราวโดยไม่ต้องแจ้งล่วงหน้า</p>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">5. การระงับการใช้งาน</h2>
          <p class="mt-2">เราขอสงวนสิทธิ์เตะบอทออกจากเซิร์ฟเวอร์ หรือบล็อกเซิร์ฟเวอร์/ผู้ใช้ที่ทำผิดข้อกำหนด ก่อกวน หรือสร้างภาระเกินควรต่อระบบ โดยไม่ต้องแจ้งล่วงหน้า</p>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">6. ข้อจำกัดความรับผิด</h2>
          <p class="mt-2">ในขอบเขตสูงสุดที่กฎหมายอนุญาต เราไม่รับผิดต่อความเสียหายทางตรงหรือทางอ้อมที่เกิดจากการใช้หรือใช้บอทไม่ได้ รวมถึงการสูญหายของข้อมูลหรือการหยุดชะงักของเซิร์ฟเวอร์ Discord ของคุณ</p>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">7. แพ็กเกจแบบชำระเงิน การต่ออายุ และการคืนเงิน</h2>
          <ul class="mt-2 list-disc pl-5 space-y-1">
            <li>แพ็กเกจ 99฿ ต่อดิสต่อ 30 วัน เริ่มนับจากวันที่อนุมัติสลิป (ถ้าของเดิมยังไม่หมด ต่อจากวันหมดเดิม ไม่เสียวัน)</li>
            <li>หมดอายุแล้วยังใช้งานต่อได้อีก 3 วัน (grace) หลังจากนั้นคำสั่งเล่นเพลงจะถูกระงับจนกว่าจะต่ออายุ</li>
            <li>สลิปปลอม/ยอดไม่ตรง/ส่งสลิปซ้ำ = ตีกลับ ไม่ต่ออายุ</li>
            <li>คืนเงินเฉพาะกรณีบอทใช้งานไม่ได้เกิน 7 วันติดต่อกันจากความผิดของเรา (หักวันใช้งานจริงแล้ว) ยกเลิกเมื่อไรก็ได้โดยแค่ไม่ต่ออายุ ไม่มีผูกมัด</li>
          </ul>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">8. การเปลี่ยนแปลงข้อกำหนด</h2>
          <p class="mt-2">เราอาจปรับปรุงหน้านี้เป็นครั้งคราว วันที่อัปเดตล่าสุดจะแสดงด้านบน การใช้งานบอทต่อไปหลังการเปลี่ยนแปลงถือว่าคุณยอมรับข้อกำหนดใหม่แล้ว</p>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">9. ติดต่อเรา</h2>
          <p class="mt-2">หากมีคำถามเกี่ยวกับข้อกำหนดนี้ ติดต่อผ่านเซิร์ฟเวอร์ Discord ที่ติดตั้งบอท หรือผ่านเจ้าของบอทโดยตรง</p>
        </section>

        <hr class="border-white/10" />

        <section class="text-zinc-400">
          <h2 class="text-base font-semibold text-zinc-100">Terms of Service (English Summary)</h2>
          <p class="mt-2">I-Waen is a free Discord music bot provided "as-is". By inviting or using the bot you agree to use it lawfully, respect Discord's Terms and content rights, and accept that we may modify, limit, or suspend the service at any time without warranty or liability.</p>
        </section>
      </div>

      <div class="mt-6 flex gap-4 text-sm">
        <RouterLink to="/privacy" class="underline text-zinc-400 hover:text-zinc-100">นโยบายความเป็นส่วนตัว</RouterLink>
        <RouterLink to="/" class="underline text-zinc-400 hover:text-zinc-100">หน้าแรก</RouterLink>
      </div>
    </div>
  </div>
</template>
