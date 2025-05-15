import User from '~/server/models/user';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate input
    if (!body.name || !body.email || !body.password) {
      return { status: 400, message: 'All fields are required.' };
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return { status: 400, message: 'User already exists.' };
    }

    // Create a new user
    const newUser = new User({
      name: body.name,
      email: body.email,
      password: body.password, // Note: Hash the password in production
    });

    await newUser.save();

    return { status: 201, message: 'User created successfully.', user: newUser };
  } catch (error: any) {
    return { status: 500, message: 'Internal server error.', error: error.message };
  }
});
