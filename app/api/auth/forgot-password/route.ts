import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { sendEmail } from '@/lib/mail';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findOne({ email });

        if (!user) {
            // For security, do not reveal if user exists. 
            // But for better UX in internal apps, sometimes it's allowed. 
            // User asked to "make it function", usually implies feedback.
            // I'll return success even if user not found (security best practice) or 404 depending on preference.
            // Given the "User already exists" in register returning 409, precise errors seem preferred.
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Generate token
        const token = uuidv4();
        const expires = new Date(Date.now() + 3600000); // 1 hour

        user.resetPasswordToken = token;
        user.resetPasswordExpires = expires;
        await user.save();

        // Send email
        // Use origin from request headers if env var is missing, or default to localhost
        const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const resetUrl = `${origin}/auth/reset-password?token=${token}`;

        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Please click the button below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>Or copy and paste this link into your browser:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `;

        await sendEmail(email, 'Password Reset Request', html);

        return NextResponse.json({ message: 'Password reset email sent' }, { status: 200 });

    } catch (error: any) {
        console.error('Forgot password error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
