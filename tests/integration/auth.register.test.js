const request = require('supertest');
const app = require('../../app.js');
const User = require('../../infrastructure/database/models/userModel.js');

//SUPER TEST: REGISTER API TESTING
describe('POST /api/v1/auth/register (Integration)', () => {
  const endpoint = '/api/auth/register';

  test('201 on happy path with safe response (no password)', async () => {
    const payload = {
      name: 'Neeraj',
      email: 'neeraj@example.com',
      phone: '+919876543210',
      password: 'Secret123!'
    };

    const res = await request(app).post(endpoint).send(payload);

    // ✅ Status & success flag
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);

    // ✅ Partial match (no password in response)
    expect(res.body.user).toMatchObject({
      name: 'Neeraj',
      email: 'neeraj@example.com',
      phone: '+919876543210'
    });

    // ✅ Ensure password is NOT sent to client
    expect(res.body.user).not.toHaveProperty('password');

    // ✅ Confirm it is stored & hashed in DB
    const saved = await User.findOne({ email: payload.email }).select('+password');
    expect(saved).toBeTruthy();
    expect(saved.password).toBeDefined();
    expect(saved.password).not.toEqual(payload.password);
  });

//response for 400
// {
//     "success": false,
//     "errors": [
//         "Invalid email format",
//         "phone number is not valid.",
//         "Password must contain uppercase, lowercase, number, and special character"
//     ]
// }

  test('400 on invalid payload (bad email, short password, invalid phone)', async () => {
    const res = await request(app).post(endpoint).send({
      name: 'Neeraj',
      email: 'bad',
      phone: '12345',
      password: 'short'
    });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors.join(" ")).toMatch(
      /Invalid email format|phone number is not valid.|Password must contain uppercase, lowercase, number, and special character/
    );
  });



//Response 409 
// {
//     "message": "User already exists",
//     "user": null,
//     "success": false
// }


  test('409 on duplicate email', async () => {
    const first = {
      name: 'Neerajdighade',
      email: 'dupe1@example.com',
      phone: '+919999999999',
      password: 'Secret123!'
    };
    await request(app).post(endpoint).send(first).expect(201);

    const res = await request(app).post(endpoint).send({
      name: 'Neerajdighade',
      email: 'dupe1@example.com',
      phone: '+918888888888',
      password: 'Secret123!'
    });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/User already exists/);
  });
});
