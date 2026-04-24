/**
 * Seed script — Sprint 1
 * Creates test accounts from plan_v4.md Section 10.3.
 * Idempotent: uses upsert by email so it is safe to run multiple times.
 *
 * All passwords are set to "Password1!" for local development only.
 * bcryptjs cost factor 12 per plan_v4.md prompt rules.
 *
 * Run via: pnpm db:seed
 */

import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const COST_FACTOR = 12;
const DEFAULT_PASSWORD = 'Password1!';

async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, COST_FACTOR);
}

async function main() {
  console.log('🌱 Starting seed...');

  // ------------------------------------------------------------------
  // 1. Tenants (universities)
  // ------------------------------------------------------------------
  const tenantA = await prisma.tenant.upsert({
    where: { emailDomain: 'university-a.edu' },
    update: {},
    create: {
      name: 'University A',
      emailDomain: 'university-a.edu',
    },
  });

  const tenantB = await prisma.tenant.upsert({
    where: { emailDomain: 'university-b.edu' },
    update: {},
    create: {
      name: 'University B',
      emailDomain: 'university-b.edu',
    },
  });

  console.log(`✅ Tenants: ${tenantA.name}, ${tenantB.name}`);

  // ------------------------------------------------------------------
  // 2. Helper to upsert a user
  // ------------------------------------------------------------------
  async function upsertUser(data: {
    email: string;
    displayName: string;
    role: UserRole;
    status: UserStatus;
    emailVerified: boolean;
    tenantId?: string | null;
  }) {
    const passwordHash = await hashPassword(DEFAULT_PASSWORD);
    return prisma.user.upsert({
      where: { email: data.email },
      update: {
        // Only update mutable fields; leave password alone if already set
        displayName: data.displayName,
        role: data.role,
        status: data.status,
        emailVerified: data.emailVerified,
        tenantId: data.tenantId ?? null,
      },
      create: {
        email: data.email,
        displayName: data.displayName,
        passwordHash,
        role: data.role,
        status: data.status,
        emailVerified: data.emailVerified,
        tenantId: data.tenantId ?? null,
      },
    });
  }

  // ------------------------------------------------------------------
  // 3. Platform Admin
  // ------------------------------------------------------------------
  await upsertUser({
    email: 'admin@auctionportal.test',
    displayName: 'Platform Admin',
    role: UserRole.PLATFORM_ADMIN,
    status: UserStatus.ACTIVE,
    emailVerified: true,
    tenantId: null,
  });
  console.log('✅ Platform Admin: admin@auctionportal.test');

  // ------------------------------------------------------------------
  // 4. University Admins
  // ------------------------------------------------------------------
  await upsertUser({
    email: 'uniadmin1@university-a.edu',
    displayName: 'University A Admin',
    role: UserRole.UNIVERSITY_ADMIN,
    status: UserStatus.ACTIVE,
    emailVerified: true,
    tenantId: tenantA.id,
  });

  await upsertUser({
    email: 'uniadmin2@university-b.edu',
    displayName: 'University B Admin',
    role: UserRole.UNIVERSITY_ADMIN,
    status: UserStatus.ACTIVE,
    emailVerified: true,
    tenantId: tenantB.id,
  });
  console.log('✅ University Admins: uniadmin1@university-a.edu, uniadmin2@university-b.edu');

  // ------------------------------------------------------------------
  // 5. Affiliated Students — University A
  // ------------------------------------------------------------------
  await upsertUser({
    email: 'student1@university-a.edu',
    displayName: 'Student One (Uni A)',
    role: UserRole.STUDENT,
    status: UserStatus.ACTIVE,
    emailVerified: true,
    tenantId: tenantA.id,
  });

  await upsertUser({
    email: 'student2@university-a.edu',
    displayName: 'Student Two (Uni A)',
    role: UserRole.STUDENT,
    status: UserStatus.ACTIVE,
    emailVerified: true,
    tenantId: tenantA.id,
  });
  console.log('✅ University A Students: student1, student2');

  // ------------------------------------------------------------------
  // 6. Affiliated Students — University B
  // ------------------------------------------------------------------
  await upsertUser({
    email: 'student3@university-b.edu',
    displayName: 'Student Three (Uni B)',
    role: UserRole.STUDENT,
    status: UserStatus.ACTIVE,
    emailVerified: true,
    tenantId: tenantB.id,
  });

  await upsertUser({
    email: 'student4@university-b.edu',
    displayName: 'Student Four (Uni B)',
    role: UserRole.STUDENT,
    status: UserStatus.ACTIVE,
    emailVerified: true,
    tenantId: tenantB.id,
  });
  console.log('✅ University B Students: student3, student4');

  // ------------------------------------------------------------------
  // 7. Unaffiliated Students
  // ------------------------------------------------------------------
  await upsertUser({
    email: 'student5@gmail.com',
    displayName: 'Student Five (Unaffiliated)',
    role: UserRole.STUDENT,
    status: UserStatus.ACTIVE,
    emailVerified: true,
    tenantId: null,
  });

  await upsertUser({
    email: 'student6@gmail.com',
    displayName: 'Student Six (Unaffiliated)',
    role: UserRole.STUDENT,
    status: UserStatus.ACTIVE,
    emailVerified: true,
    tenantId: null,
  });
  console.log('✅ Unaffiliated Students: student5@gmail.com, student6@gmail.com');

  // ------------------------------------------------------------------
  // 8. Unverified user
  // ------------------------------------------------------------------
  await upsertUser({
    email: 'unverified@gmail.com',
    displayName: 'Unverified User',
    role: UserRole.STUDENT,
    status: UserStatus.UNVERIFIED,
    emailVerified: false,
    tenantId: null,
  });
  console.log('✅ Unverified: unverified@gmail.com');

  // ------------------------------------------------------------------
  // 9. Suspended user (affiliated with Uni A)
  // ------------------------------------------------------------------
  await upsertUser({
    email: 'suspended@university-a.edu',
    displayName: 'Suspended User (Uni A)',
    role: UserRole.STUDENT,
    status: UserStatus.SUSPENDED,
    emailVerified: true,
    tenantId: tenantA.id,
  });
  console.log('✅ Suspended: suspended@university-a.edu');

  console.log('\n🎉 Seed complete. All test accounts are ready.');
  console.log(`   Default password for all accounts: "${DEFAULT_PASSWORD}"`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
