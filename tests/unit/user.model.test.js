const mongoose = require('mongoose');
const User = require('../../infrastructure/database/models/userModel');

//TEST SUITES..
describe('User Model (Unit)', () => {

// TEST CASE1
  test('requires name, email, phone, password', async () => {
    const user = new User({});
    let err;
    try { await user.validate(); } catch (e) { err = e; }
    expect(err).toBeDefined();
    const messages = Object.values(err.errors).map((e) => e.message);
    expect(messages).toEqual(
      expect.arrayContaining([
        "name is required.",
        "Email is required",
        "Phone number is required",
        "Path `password` is required."
      ])
    );
  });

//TEST CASE2
  test('rejects invalid email format', async () => {
    const user = new User({
      name: 'Neeraj',
      email: 'bad-email',
      phone: '+919876543210',
      password: 'Secret123!'
    });
    await expect(user.validate()).rejects.toThrow(/Invalid email format/);
  });

//TEST CASE3
  test('rejects invalid phone and normalizes valid phone to E.164', async () => {
    const bad = new User({
      name: 'Neeraj',
      email: 'a@example.com',
      phone: '12345',
      password: 'Secret123!'
    });
    await expect(bad.validate()).rejects.toThrow(/Invalid phone number format/);
     
    const good = new User({
      name: 'Neeraj',
      email: 'n@example.com',
      phone: '09876543210', // India local
      password: 'Secret123!'
    });
    await good.validate();
    expect(good.phone).toMatch(/^\+\d{8,15}$/); // normalized
  });

});
