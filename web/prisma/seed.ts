import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const HOODS: Record<string, [number, number]> = {
  Kasarani: [-1.2196, 36.8966], Roysambu: [-1.2167, 36.8833], Umoja: [-1.2833, 36.8917],
  Embakasi: [-1.3167, 36.9], Kibera: [-1.3133, 36.7892], Westlands: [-1.2649, 36.805],
  Kilimani: [-1.2906, 36.7833], Karen: [-1.3197, 36.7085], Donholm: [-1.292, 36.887],
  Kahawa: [-1.183, 36.923], "South B": [-1.308, 36.835], Lavington: [-1.279, 36.77],
};
const hoodNames = Object.keys(HOODS);

const TRADES: Record<string, string> = {
  plumber: "leak repair, drainage, water tanks, pipe fitting",
  electrician: "wiring, sockets, circuit breakers, solar, rewiring",
  mason: "bricklaying, plastering, foundations, concrete, tiling",
  painter: "painting, wall finishing, waterproofing, decoration",
  welder: "metal gates, grills, steel fabrication, mabati",
  carpenter: "furniture, cabinets, doors, gypsum ceilings, roof timber",
  cleaner: "house cleaning, deep cleaning, laundry, fumigation",
  driver: "delivery, logistics, airport transfers, school run",
  mechanic: "engine repair, brakes, service, diagnostics, tyres",
  beautician: "hair, braiding, makeup, nails, facials, grooming",
  chef: "private chef, catering, baking, meal prep, events",
  gardener: "lawn care, hedging, planting, landscaping, irrigation",
  tutor: "maths, sciences, languages, coding, exam prep",
  nanny: "childcare, babysitting, elderly care, daycare",
  security_guard: "patrol, watchman, event security, CCTV monitoring",
  pest_control: "fumigation, rodents, termites, bedbugs, spraying",
  locksmith: "lock fitting, rekeying, lockouts, padlocks, safes",
  mover: "house moving, packing, loading, office relocation",
  photographer: "events, portraits, weddings, product, video",
  tailor: "stitching, alterations, suits, uniforms, curtains",
  appliance_repair: "fridges, washers, ovens, TVs, microwaves",
  computer_technician: "laptop repair, networks, data recovery, setups",
};
const FIRST = ["Otieno", "Wanjiku", "Kamau", "Achieng", "Mwangi", "Njoroge", "Atieno",
  "Kiprono", "Mutua", "Chebet", "Omondi", "Wafula", "Njeri", "Barasa", "Wambui", "Onyango",
  "Kemboi", "Adhiambo", "Gitonga", "Cheruiyot", "Nyambura", "Owino", "Mueni", "Kiptoo",
  "Auma", "Maina", "Wairimu", "Juma", "Akinyi", "Korir", "Nasimiyu", "Were"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function jitter([lat, lng]: [number, number]): [number, number] {
  return [lat + (Math.random() - 0.5) * 0.02, lng + (Math.random() - 0.5) * 0.02];
}

async function main() {
  // wipe (dev only)
  await prisma.review.deleteMany();
  await prisma.match.deleteMany();
  await prisma.job.deleteMany();
  await prisma.fraudFlag.deleteMany();
  await prisma.workerProfile.deleteMany();
  await prisma.user.deleteMany();

  const pass = await bcrypt.hash("password123", 10);

  await prisma.user.create({
    data: { name: "Admin", phone: "+254700000000", passwordHash: pass, role: "ADMIN",
      neighborhood: "CBD", lat: -1.2864, lng: 36.8172 },
  });

  await prisma.user.create({
    data: { name: "Grace Client", phone: "+254711000001", passwordHash: pass, role: "CLIENT",
      neighborhood: "Kasarani", lat: -1.2196, lng: 36.8966 },
  });
  await prisma.user.create({
    data: { name: "David Client", phone: "+254711000002", passwordHash: pass, role: "CLIENT",
      neighborhood: "Westlands", lat: -1.2649, lng: 36.805 },
  });

  let n = 0;
  for (const [trade, skills] of Object.entries(TRADES)) {
    for (let k = 0; k < 2; k++) {
      n++;
      const hood = hoodNames[Math.floor(Math.random() * hoodNames.length)];
      const [lat, lng] = jitter(HOODS[hood]);
      const ratingCount = [0, 6, 18, 35][Math.floor(Math.random() * 4)];
      const avg = ratingCount ? Math.round((3.7 + Math.random() * 1.2) * 10) / 10 : 0;
      const accepted = ratingCount + Math.floor(Math.random() * 6);
      const completed = Math.max(0, accepted - Math.floor(Math.random() * 3));
      await prisma.user.create({
        data: {
          name: `${FIRST[n % FIRST.length]} (${trade})`,
          phone: `+2547${20 + n}${String(100000 + n * 137).slice(0, 6)}`,
          passwordHash: pass, role: "WORKER", neighborhood: hood, lat, lng,
          workerProfile: {
            create: {
              trade, skills,
              experienceYears: 1 + Math.floor(Math.random() * 14),
              hourlyRate: [300, 400, 500, 600, 700, 800][Math.floor(Math.random() * 6)],
              avgRating: avg, ratingCount, jobsCompleted: completed, jobsAccepted: accepted,
              isVerified: Math.random() > 0.5,
              availableDays: DAYS.slice(0, 4 + Math.floor(Math.random() * 4)),
            },
          },
        },
      });
    }
  }

  console.log(`Seeded admin, 2 clients, ${n} workers across ${Object.keys(TRADES).length} trades. Login password: password123`);
  console.log("  admin  +254700000000 | client +254711000001 | (worker phones vary)");
}

main().finally(() => prisma.$disconnect());
