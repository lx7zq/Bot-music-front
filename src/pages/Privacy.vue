<template>
  <div class="app-root min-h-screen bg-[#0a0a12] font-sans text-zinc-100">
    <div class="max-w-3xl mx-auto px-6 py-12">
      <RouterLink to="/" class="text-sm text-zinc-400 hover:text-zinc-100">← กลับหน้าแรก</RouterLink>

      <h1 class="mt-4 text-3xl font-bold tracking-tight">นโยบายความเป็นส่วนตัว (Privacy Policy)</h1>
      <p class="mt-2 text-sm text-zinc-500">ไอแว่น 🐻 DJ — Discord Music Bot • อัปเดตล่าสุด: 23 กันยายน 2026</p>

      <div class="glass-panel mt-8 p-6 sm:p-8 space-y-6 text-sm leading-relaxed text-zinc-300">
        <section>
          <h2 class="text-base font-semibold text-zinc-100">1. ข้อมูลที่เราเก็บ</h2>
          <p class="mt-2">บอทเก็บเฉพาะข้อมูลที่จำเป็นเพื่อให้เพลงเล่นได้และแสดงบน Dashboard เท่านั้น:</p>
          <ul class="mt-2 list-disc pl-5 space-y-1">
            <li><b>รหัสเซิร์ฟเวอร์ (Guild ID)</b> และ <b>ชื่อเซิร์ฟเวอร์ / ชื่อห้องเสียง</b> — สำหรับแยกคิวแต่ละเซิร์ฟเวอร์</li>
            <li><b>คิวเพลง</b> — ชื่อเพลง, ลิงก์, ความยาว, ภาพปก, และ <b>ชื่อผู้ขอ (display name)</b></li>
            <li><b>สถานะการเล่น</b> — กำลังเล่น / หยุดชั่วคราว / ระดับเสียง</li>
          </ul>
          <p class="mt-2">เรา <b>ไม่เก็บ</b> รหัสผ่าน, โทเคนผู้ใช้, ข้อความแชท, อีเมล, หรือข้อมูลเสียง (voice audio) ของคุณ</p>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">2. วิธีใช้ข้อมูล</h2>
          <ul class="mt-2 list-disc pl-5 space-y-1">
            <li>ใช้เพื่อเล่นเพลงตามคิวและแสดงสถานะบน Dashboard แบบเรียลไทม์</li>
            <li>ใช้เพื่อแก้บั๊ก ป้องกันการ abuse และปรับปรุงคุณภาพบริการ</li>
            <li>ไม่มีการขายข้อมูล ไม่แชร์ให้บุคคลที่สามเพื่อการโฆษณา</li>
          </ul>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">3. การเก็บรักษาและลบข้อมูล</h2>
          <ul class="mt-2 list-disc pl-5 space-y-1">
            <li>คิวเพลงและสถานะ เก็บไว้ในหน่วยความจำชั่วคราว (in-memory) บนเซิร์ฟเวอร์ และจะหายไปเมื่อบอทรีสตาร์ทหรือออกจากห้องเสียงครบ ~3 นาที (auto-disconnect)</li>
            <li>ไฟล์เสียงที่ดาวน์โหลดชั่วคราวใน /tmp จะถูกลบทันทีหลังเล่นจบหรือข้ามเพลง</li>
            <li>เตะบอทออกจากเซิร์ฟเวอร์ = หยุดเก็บข้อมูลของเซิร์ฟเวอร์นั้นทันที หากต้องการลบถาวร ติดต่อเจ้าของบอทได้เลย</li>
          </ul>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">4. บริการของบุคคลที่สาม</h2>
          <p class="mt-2">บอทพึ่งพา Discord API และแหล่งเสียงสาธารณะ (เช่น YouTube ผ่าน yt-dlp) การใช้งานของคุณจึงอยู่ภายใต้นโยบายของบริการเหล่านั้นด้วย: <a class="underline" href="https://discord.com/privacy" target="_blank" rel="noopener">Discord Privacy Policy</a> และนโยบายของผู้ให้บริการเนื้อหา</p>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">5. สิทธิ์ของคุณ</h2>
          <p class="mt-2">คุณสามารถใช้คำสั่ง /stop หรือ /clear เพื่อล้างคิว, ใช้ /leave เพื่อให้บอทออกและล้างสถานะ, หรือเตะบอทออกเพื่อหยุดการประมวลผลทั้งหมด หากต้องการสำเนาหรือขอลบข้อมูลที่เหลืออยู่ ติดต่อเจ้าของบอทได้โดยตรง</p>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">6. เด็กและเยาวชน</h2>
          <p class="mt-2">บอทไม่ได้ออกแบบมาเพื่อเก็บข้อมูลเด็กโดยเฉพาะ ผู้ใช้ต้องมีอายุตามเกณฑ์ขั้นต่ำของ Discord (13 ปีขึ้นไปในส่วนใหญ่ประเทศ)</p>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">7. การเปลี่ยนแปลงนโยบาย</h2>
          <p class="mt-2">เราอาจอัปเดตหน้านี้เมื่อบริการเปลี่ยนไป โดยจะระบุวันที่อัปเดตล่าสุดไว้ด้านบนเสมอ</p>
        </section>

        <section>
          <h2 class="text-base font-semibold text-zinc-100">8. ติดต่อเรา</h2>
          <p class="mt-2">คำถามเรื่องความเป็นส่วนตัว ติดต่อผ่านเซิร์ฟเวอร์ Discord ที่ติดตั้งบอท หรือเจ้าของบอทโดยตรง</p>
        </section>

        <hr class="border-white/10" />

        <section class="text-zinc-400">
          <h2 class="text-base font-semibold text-zinc-100">Privacy Policy (English Summary)</h2>
          <p class="mt-2">I-Waen only processes the minimum data needed to play music: guild ID/name, voice channel name, song queue (title, URL, duration, thumbnail, requester's display name), and playback state. Data lives in temporary server memory, temp audio files are deleted after playback, and nothing is sold or shared for ads. Kick the bot or use /stop to clear your server's data.</p>
        </section>
      </div>

      <div class="mt-6 flex gap-4 text-sm">
        <RouterLink to="/terms" class="underline text-zinc-400 hover:text-zinc-100">ข้อกำหนดการให้บริการ</RouterLink>
        <RouterLink to="/" class="underline text-zinc-400 hover:text-zinc-100">หน้าแรก</RouterLink>
      </div>
    </div>
  </div>
</template>
