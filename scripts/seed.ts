import { db } from "../src/lib/db";
import { hero, about, experiences, projects, contact, siteSettings } from "../src/lib/db/schema";
import { slugify } from "../src/lib/utils";

// Content mirrors https://www.xyrus10.dev as of 2026-08-14.
// NOTE: every bio/description field below is rendered through
// dangerouslySetInnerHTML (see src/components/About.tsx and Hero.tsx), so it is
// raw HTML, not JSX — attributes must be `class`, never `className`.

async function main() {
  console.log("Seeding database...");

  // Hero
  await db.delete(hero);
  await db.insert(hero).values({
    name: "Ibnu Rizqia Ramadan",
    titleId: "AI-Powered Fullstack Engineer & Infrastructure Specialist @ GoThru.co",
    titleEn: "AI-Powered Fullstack Engineer & Infrastructure Specialist @ GoThru.co",
    descriptionId: "Menembus batas antara <strong>software development</strong> dan <strong>system administration</strong> dengan dukungan teknologi AI. Saya membangun aplikasi web modern yang cepat dengan <strong>Next.js, Go, Node.js, & TypeScript</strong>, sekaligus mengarsiteki infrastruktur server berbasis <strong>Proxmox & LXC</strong> secara efisien. Berfokus pada efisiensi kode, kecepatan delivery, dan reliabilitas sistem yang kokoh.",
    descriptionEn: "Bridging the gap between <strong>software development</strong> and <strong>system administration</strong> powered by AI. I build fast, modern web applications using <strong>Next.js, Go, Node.js, & TypeScript</strong>, while efficiently architecting server infrastructure based on <strong>Proxmox & LXC</strong>. Focused on code efficiency, delivery speed, and robust system reliability.",
    imageUrl: "/xyrus10.jpg"
  });

  // About
  await db.delete(about);
  await db.insert(about).values({
    titleId: "Tentang Saya",
    titleEn: "About Me",
    bio1Id: "Menembus Batas Code & <br /><span class=\"text-[#2b7fff]\">Infrastruktur Server.</span>",
    bio1En: "Breaking Boundaries in Code & <br /><span class=\"text-[#2b7fff]\">Server Infrastructure.</span>",
    bio2Id: "Halo! Saya Ibnu Rizqia Ramadan, seorang <span class=\"text-[#F8FAFC] font-medium\">AI-Powered Fullstack Engineer & Infrastructure Specialist</span> yang saat ini bekerja di <a href=\"https://gothru.co\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#2b7fff] hover:underline font-medium\">GoThru.co</a>. Saya berfokus pada pembangunan aplikasi web berkinerja tinggi serta pengelolaan infrastruktur server yang <span class=\"italic\">scalable</span>, memanfaatkan efisiensi kecerdasan buatan untuk mempercepat alur kerja pengembangan modern.",
    bio2En: "Hello! I'm Ibnu Rizqia Ramadan, an <span class=\"text-[#F8FAFC] font-medium\">AI-Powered Fullstack Engineer & Infrastructure Specialist</span> currently working at <a href=\"https://gothru.co\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#2b7fff] hover:underline font-medium\">GoThru.co</a>. I focus on building high-performance web applications and managing scalable server infrastructure, leveraging AI efficiency to accelerate modern development workflows.",
    bio3Id: "Menjembatani celah antara rekayasa perangkat lunak dan administrasi sistem, saya mengadopsi alat bantu AI untuk mengoptimalkan seluruh siklus pemrograman. Di ranah <span class=\"italic\">software development</span>, saya terbiasa membangun sistem yang cepat dan efisien menggunakan <span class=\"text-[#F8FAFC] font-medium\">Next.js</span>, <span class=\"text-[#F8FAFC] font-medium\">Go (Fiber)</span>, <span class=\"text-[#F8FAFC] font-medium\">Bun</span>, dan <span class=\"text-[#F8FAFC] font-medium\">Drizzle ORM</span>. Sementara di sisi infrastruktur, saya memiliki keahlian dalam pengelolaan <span class=\"text-[#F8FAFC] font-medium\">bare-metal server</span>, optimalisasi lingkungan <span class=\"text-[#F8FAFC] font-medium\">Proxmox Virtual Environment</span>, hingga manajemen <span class=\"text-[#F8FAFC] font-medium\">LXC</span>.<p class=\"mt-4\">Selain bekerja sebagai profesional, saya juga aktif mengelola dan mengembangkan infrastruktur layanan hosting mandiri melalui <a href=\"https://hostingin.net\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#2b7fff] hover:underline font-medium\">Hostingin.net</a>. Kombinasi antara efisiensi AI, optimasi kode, dan ketangguhan arsitektur server adalah kunci saya dalam menghadirkan solusi digital yang andal dari hulu ke hilir.</p>",
    bio3En: "Bridging the gap between software engineering and system administration, I adopt AI tools to optimize the entire programming lifecycle. In the realm of <span class=\"italic\">software development</span>, I am accustomed to building fast and efficient systems using <span class=\"text-[#F8FAFC] font-medium\">Next.js</span>, <span class=\"text-[#F8FAFC] font-medium\">Go (Fiber)</span>, <span class=\"text-[#F8FAFC] font-medium\">Bun</span>, and <span class=\"text-[#F8FAFC] font-medium\">Drizzle ORM</span>. Meanwhile on the infrastructure side, I have expertise in managing <span class=\"text-[#F8FAFC] font-medium\">bare-metal servers</span>, optimizing <span class=\"text-[#F8FAFC] font-medium\">Proxmox Virtual Environments</span>, and managing <span class=\"text-[#F8FAFC] font-medium\">LXC</span>.<p class=\"mt-4\">Beyond my professional work, I also actively manage and develop the infrastructure of an independent hosting service through <a href=\"https://hostingin.net\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-[#2b7fff] hover:underline font-medium\">Hostingin.net</a>. The combination of AI efficiency, code optimization, and robust server architecture is my key to delivering reliable end-to-end digital solutions.</p>",
    skills: JSON.stringify([
      "TypeScript", "Node.js", "Next.js", "Go (Fiber)", "Bun", "Drizzle ORM",
      "Docker", "Proxmox VE", "LXC", "Tailwind CSS", "PostgreSQL", "MySQL", "DevOps", "Git"
    ])
  });

  // Experiences
  await db.delete(experiences);
  await db.insert(experiences).values([
    {
      company: "Hostingin.net",
      roleId: "Founder & System Administrator",
      roleEn: "Founder & System Administrator",
      location: "Indonesia",
      periodId: "Mar 2026 - Sekarang",
      periodEn: "Mar 2026 - Present",
      achievementsId: JSON.stringify([
        "Mendirikan dan mengelola layanan hosting independen.",
        "Mengelola bare-metal server Linux, konfigurasi jaringan, dan keamanan sistem.",
        "Mengoptimalkan lingkungan virtualisasi menggunakan Proxmox VE dan LXC."
      ]),
      achievementsEn: JSON.stringify([
        "Founded and managed an independent hosting service.",
        "Manage bare-metal Linux servers, network configuration, and system security.",
        "Optimize virtualization environments using Proxmox VE and LXC."
      ]),
      displayOrder: 1
    },
    {
      company: "GoThru",
      roleId: "Full-stack Developer",
      roleEn: "Full-stack Developer",
      location: "Subang (On-site)",
      periodId: "Nov 2022 - Sekarang",
      periodEn: "Nov 2022 - Present",
      achievementsId: JSON.stringify([
        "Membangun dan memelihara aplikasi web berkinerja tinggi menggunakan JavaScript dan React.js.",
        "Membantu pengelolaan infrastruktur server dan pemeliharaan sistem sebagai asisten Sysadmin.",
        "Berkolaborasi dalam pengembangan produk utama perusahaan dengan fokus pada skalabilitas.",
        "Mengelola dan mengoptimalkan fitur-fitur frontend dan backend."
      ]),
      achievementsEn: JSON.stringify([
        "Build and maintain high-performance web applications using JavaScript and React.js.",
        "Assisted in server infrastructure management and system maintenance as an Assistant Sysadmin.",
        "Collaborate in core product development with a focus on scalability.",
        "Manage and optimize both frontend and backend features."
      ]),
      displayOrder: 2
    },
    {
      company: "Dian Global Tech",
      roleId: "Full-stack Developer",
      roleEn: "Full-stack Developer",
      location: "Bandung, Jawa Barat (On-site)",
      periodId: "Feb 2020 - Agu 2021",
      periodEn: "Feb 2020 - Aug 2021",
      achievementsId: JSON.stringify([
        "Bertanggung jawab dalam pengembangan software dari hulu ke hilir.",
        "Mengimplementasikan fitur-fitur baru menggunakan ekosistem JavaScript.",
        "Meningkatkan kualitas kode dan performa aplikasi secara keseluruhan."
      ]),
      achievementsEn: JSON.stringify([
        "Responsible for end-to-end software development.",
        "Implemented new features using the JavaScript ecosystem.",
        "Improved overall code quality and application performance."
      ]),
      displayOrder: 3
    },
    {
      company: "DSTI ITB",
      roleId: "Junior Programmer (Magang)",
      roleEn: "Junior Programmer (Intern)",
      location: "Bandung, Indonesia",
      periodId: "Okt 2016 - Des 2016",
      periodEn: "Oct 2016 - Dec 2016",
      achievementsId: JSON.stringify([
        "Mengembangkan aplikasi web management assets untuk internal ITB.",
        "Membangun portal web prestasi mahasiswa ITB selama periode magang 3 bulan.",
        "Bekerja sama dengan tim pengembang senior untuk memastikan kualitas modul yang dibangun."
      ]),
      achievementsEn: JSON.stringify([
        "Developed web management assets application for internal ITB use.",
        "Built ITB student achievement web portal during the 3-month internship period.",
        "Collaborated with senior developers to ensure the quality of developed modules."
      ]),
      displayOrder: 4
    }
  ]);

  // Projects — slug drives /project/[slug]; derive it with the same helper the
  // admin form uses so seeded and hand-created rows can never disagree.
  const projectRows = [
    {
      title: "Bukit Pamoyanan Ticketing System",
      descriptionId: "Sistem pertiketan komprehensif untuk Wisata Alam Bukit Pamoyanan di Subang. Dibuat selama magang di DSTI ITB, menampilkan pemesanan online, integrasi pembayaran, dan manajemen pengunjung.",
      descriptionEn: "A comprehensive ticketing system for Bukit Pamoyanan Natural Tourism in Subang. Built during internship at DSTI ITB, featuring online booking, payment integration, and visitor management.",
      techStack: JSON.stringify(["MySQL", "C#"]),
      displayOrder: 0
    },
    {
      title: "XyBeat - Discord Music Bot",
      descriptionId: "Bot musik Discord canggih dengan TypeScript & discord.js v14. Fitur integrasi yt-dlp asli, sistem unduhan latar belakang (mengunduh 5 lagu berikutnya terlebih dahulu), pelacakan progres real-time, caching MP3, persistensi antrean Redis dengan pemulihan kerusakan, dan manajemen suara cerdas. Mendukung playlist YouTube, mix, dan pengunduhan serentak (2-3 lagu per server).",
      descriptionEn: "Advanced Discord music bot with TypeScript & discord.js v14. Features native yt-dlp integration, background download system (pre-downloads next 5 songs), real-time progress tracking, MP3 caching, Redis queue persistence with crash recovery, and smart voice management. Supports YouTube playlists, mixes, and concurrent downloading (2-3 songs per server).",
      techStack: JSON.stringify(["TypeScript", "Discord.js v14", "yt-dlp", "FFmpeg", "Redis", "Node.js"]),
      githubUrl: "https://github.com/ibnurizqiaramadan/xybeat",
      displayOrder: 1
    },
    {
      title: "Face Clustering with GPU",
      descriptionId: "Aplikasi pengelompokan wajah berkinerja tinggi menggunakan InsightFace + FAISS GPU. Fitur pemrosesan paralel GPU ganda dengan throughput 2.45 img/s (207% lebih cepat daripada CPU). Secara otomatis mengelompokkan foto berdasarkan wajah dengan caching Redis dan visualisasi bounding box.",
      descriptionEn: "High-performance face clustering application using InsightFace + FAISS GPU. Features dual GPU parallel processing with 2.45 img/s throughput (207% faster than CPU). Automatically groups photos by faces with Redis caching and bounding box visualization.",
      techStack: JSON.stringify(["Python", "InsightFace", "FAISS GPU", "Redis", "OpenCV"]),
      githubUrl: "https://github.com/ibnurizqiaramadan/face-grouping",
      displayOrder: 2
    }
  ];

  await db.delete(projects);
  await db.insert(projects).values(projectRows.map((p) => ({ ...p, slug: slugify(p.title) })));

  // Contact
  await db.delete(contact);
  await db.insert(contact).values({
    email: "dadanibnu61@gmail.com",
    phone: "+6282315100550",
    locationId: "Subang, Jawa Barat, Indonesia",
    locationEn: "Subang, West Java, Indonesia"
  });

  // Site settings — insert-if-absent rather than delete-and-replace, so a
  // re-seed never clobbers favicon_url or a title edited in /admin/settings.
  await db
    .insert(siteSettings)
    .values([
      { key: "site_title", value: "Ibnu Rizqia Ramadan - AI-Powered Fullstack Engineer & Infrastructure Specialist @ GoThru.co" },
      { key: "site_description", value: "AI-Powered Fullstack Engineer & Infrastructure Specialist di GoThru.co. Berfokus pada pembangunan aplikasi web berkinerja tinggi serta pengelolaan infrastruktur server yang scalable." }
    ])
    .onConflictDoNothing();

  console.log("Seeding completed successfully!");
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
