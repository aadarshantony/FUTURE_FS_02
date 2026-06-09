/**
 * Gatherly CRM — Seed Script
 * Adds 22 leads (with various statuses, sources, deal values, and dates)
 * plus a demo admin user if one doesn't exist.
 *
 * Usage (from /backend directory):
 *   node seed.js
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

dotenv.config();

// ── Models ──────────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// ── Lead model (inline) ──────────────────────────────────────────────────────
const LEAD_STATUS_VALUES = ['new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'converted', 'lost'];
const LEAD_SOURCES = ['website', 'referral', 'partner', 'advertisement', 'cold_outreach', 'social_media', 'event', 'other'];

const noteSchema = new mongoose.Schema(
  { content: { type: String, required: true, trim: true }, createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } },
  { timestamps: true }
);

const leadSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    source: { type: String, enum: LEAD_SOURCES, default: 'website' },
    status: { type: String, enum: LEAD_STATUS_VALUES, default: 'new' },
    dealValue: { type: Number, default: 0, min: 0 },
    notes: [noteSchema],
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    lastContactedAt: { type: Date, default: null },
    isPublicLead: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

// ── Activity model ───────────────────────────────────────────────────────────
const activitySchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    description: { type: String, required: true },
    lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);

// ── Seed data ────────────────────────────────────────────────────────────────
const LEADS_DATA = [
  { fullName: 'Sarah Mitchell', email: 'sarah.mitchell@techcorp.io', phone: '+1 415 555 0101', company: 'TechCorp Solutions', source: 'referral', status: 'converted', dealValue: 48000, daysAgo: 120 },
  { fullName: 'James Patterson', email: 'jpatterson@globalventures.com', phone: '+1 212 555 0102', company: 'Global Ventures Inc', source: 'website', status: 'negotiation', dealValue: 32000, daysAgo: 95 },
  { fullName: 'Emily Chen', email: 'echen@innovate.co', phone: '+1 650 555 0103', company: 'Innovate Co.', source: 'cold_outreach', status: 'proposal_sent', dealValue: 15500, daysAgo: 80 },
  { fullName: 'Marcus Williams', email: 'marcus.w@futuretech.dev', phone: '+1 310 555 0104', company: 'FutureTech Dev', source: 'social_media', status: 'qualified', dealValue: 27000, daysAgo: 75 },
  { fullName: 'Olivia Thompson', email: 'o.thompson@brightstart.co', phone: '+1 202 555 0105', company: 'BrightStart Co.', source: 'event', status: 'contacted', dealValue: 9800, daysAgo: 68 },
  { fullName: 'David Rodriguez', email: 'david.r@scalex.io', phone: '+1 512 555 0106', company: 'ScaleX Labs', source: 'partner', status: 'converted', dealValue: 62000, daysAgo: 60 },
  { fullName: 'Aisha Patel', email: 'aisha.patel@nexusdrive.com', phone: '+91 98 555 0107', company: 'NexusDrive', source: 'advertisement', status: 'new', dealValue: 5000, daysAgo: 55 },
  { fullName: 'Ethan Brooks', email: 'e.brooks@cloudnine.tech', phone: '+1 646 555 0108', company: 'CloudNine Tech', source: 'referral', status: 'lost', dealValue: 18000, daysAgo: 50 },
  { fullName: 'Priya Sharma', email: 'priya.sharma@urbanloop.in', phone: '+91 99 555 0109', company: 'UrbanLoop India', source: 'website', status: 'qualified', dealValue: 12000, daysAgo: 48 },
  { fullName: 'Noah Johnson', email: 'noah.j@apex-media.com', phone: '+1 702 555 0110', company: 'Apex Media Group', source: 'cold_outreach', status: 'negotiation', dealValue: 41500, daysAgo: 42 },
  { fullName: 'Isabella Carter', email: 'isa.carter@vortexdata.ai', phone: '+1 617 555 0111', company: 'VortexData AI', source: 'social_media', status: 'proposal_sent', dealValue: 22000, daysAgo: 38 },
  { fullName: 'Liam Nguyen', email: 'liam.nguyen@greenpath.eco', phone: '+1 415 555 0112', company: 'GreenPath Eco', source: 'event', status: 'converted', dealValue: 35000, daysAgo: 35 },
  { fullName: 'Sophia Martin', email: 'sophia.m@buildersco.net', phone: '+1 305 555 0113', company: 'Builders Co.', source: 'partner', status: 'contacted', dealValue: 8500, daysAgo: 30 },
  { fullName: 'Jackson Lee', email: 'jackson.lee@pivotlogic.com', phone: '+1 503 555 0114', company: 'PivotLogic Inc.', source: 'advertisement', status: 'qualified', dealValue: 19500, daysAgo: 27 },
  { fullName: 'Amara Osei', email: 'amara.osei@datastream.io', phone: '+233 20 555 0115', company: 'DataStream Africa', source: 'referral', status: 'new', dealValue: 7200, daysAgo: 24 },
  { fullName: 'Caleb Wright', email: 'caleb.wright@synthetics.com', phone: '+1 404 555 0116', company: 'Synthetics Corp', source: 'website', status: 'lost', dealValue: 25000, daysAgo: 20 },
  { fullName: 'Maya Johansson', email: 'maya.j@nordic-tech.se', phone: '+46 70 555 0117', company: 'Nordic Tech AB', source: 'cold_outreach', status: 'negotiation', dealValue: 53000, daysAgo: 17 },
  { fullName: 'Ryan Cooper', email: 'ryan.c@flashsales.co', phone: '+1 888 555 0118', company: 'FlashSales Inc', source: 'social_media', status: 'proposal_sent', dealValue: 14000, daysAgo: 14 },
  { fullName: 'Zara Ali', email: 'zara.ali@futurewave.pk', phone: '+92 300 555 0119', company: 'FutureWave PK', source: 'event', status: 'contacted', dealValue: 6500, daysAgo: 10 },
  { fullName: 'Logan Kim', email: 'logan.kim@seoultech.kr', phone: '+82 10 555 0120', company: 'SeoulTech Ltd', source: 'partner', status: 'qualified', dealValue: 29000, daysAgo: 7 },
  { fullName: 'Chloe Bennett', email: 'chloe.b@startup.io', phone: '+1 720 555 0121', company: 'Startup.io', source: 'advertisement', status: 'new', dealValue: 4500, daysAgo: 4 },
  { fullName: 'Aiden Foster', email: 'aiden.foster@pinnaclecrm.com', phone: '+1 214 555 0122', company: 'Pinnacle CRM', source: 'referral', status: 'converted', dealValue: 78000, daysAgo: 2 },
];

// ── Main ─────────────────────────────────────────────────────────────────────
async function seed() {
  console.log('🌱 Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected.\n');

  // 1. Ensure demo user exists
  let adminUser = await User.findOne({ email: 'demo@gatherly.io' }).select('+password');
  if (!adminUser) {
    console.log('👤 Creating demo admin user...');
    adminUser = await User.create({
      name: 'Demo Admin',
      email: 'demo@gatherly.io',
      password: 'demo1234',
      role: 'admin',
    });
    console.log('   ✅ demo@gatherly.io / demo1234\n');
  } else {
    console.log('👤 Demo user already exists (demo@gatherly.io)\n');
  }

  // 2. Seed leads
  console.log(`📋 Seeding ${LEADS_DATA.length} leads...`);
  let created = 0;

  for (const ld of LEADS_DATA) {
    const existing = await Lead.findOne({ email: ld.email });
    if (existing) {
      console.log(`   ⏭  Skipped (exists): ${ld.fullName}`);
      continue;
    }

    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - ld.daysAgo);

    const lead = await Lead.create({
      fullName: ld.fullName,
      email: ld.email,
      phone: ld.phone,
      company: ld.company,
      source: ld.source,
      status: ld.status,
      dealValue: ld.dealValue,
      createdBy: adminUser._id,
      assignedTo: adminUser._id,
      createdAt,
      updatedAt: createdAt,
    });

    // Add an activity for each lead
    await Activity.create({
      action: 'lead_created',
      description: `Lead "${ld.fullName}" from ${ld.company} was created`,
      lead: lead._id,
      user: adminUser._id,
      metadata: { source: ld.source },
      createdAt,
      updatedAt: createdAt,
    });

    // If not new, add a status change activity too
    if (ld.status !== 'new') {
      const laterDate = new Date(createdAt);
      laterDate.setDate(laterDate.getDate() + Math.ceil(ld.daysAgo * 0.3));
      await Activity.create({
        action: 'status_changed',
        description: `${ld.fullName}'s status updated to "${ld.status.replace(/_/g, ' ')}"`,
        lead: lead._id,
        user: adminUser._id,
        metadata: { oldStatus: 'new', newStatus: ld.status },
        createdAt: laterDate,
        updatedAt: laterDate,
      });
    }

    console.log(`   ✅ ${ld.fullName} [${ld.status}] — $${ld.dealValue.toLocaleString()}`);
    created++;
  }

  console.log(`\n🎉 Done! ${created} new leads seeded.\n`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
