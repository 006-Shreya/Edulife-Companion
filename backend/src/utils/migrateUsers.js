const fs = require('fs');
const path = require('path');
const User = require('../models/User');

const USERS_JSON = path.join(__dirname, '../../data/users.json');

/**
 * One-time import of legacy users.json into MongoDB when the collection is empty.
 */
const migrateUsers = async () => {
  const count = await User.countDocuments();
  if (count > 0) {
    return;
  }

  if (!fs.existsSync(USERS_JSON)) {
    console.log('No legacy users.json found — skipping migration.');
    return;
  }

  const legacyUsers = JSON.parse(fs.readFileSync(USERS_JSON, 'utf8'));
  if (!legacyUsers.length) return;

  console.log(`Migrating ${legacyUsers.length} users from users.json to MongoDB...`);

  for (const legacy of legacyUsers) {
    if (!legacy.email) continue;

    const exists = await User.findOne({ email: legacy.email.toLowerCase() });
    if (exists) continue;

    await User.create({
      fullName: legacy.fullName,
      email: legacy.email.toLowerCase(),
      password: legacy.password,
      role: 'student'
    });
  }

  console.log('User migration completed.');
};

module.exports = migrateUsers;
