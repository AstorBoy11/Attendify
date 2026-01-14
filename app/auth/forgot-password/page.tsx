'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowBigLeft, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            toast.success('Password reset link sent to your email!');
            // Optional: clear email or redirect
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dark">
            <div className="font-sans antialiased text-[#111418] dark:text-white bg-[#f6f7f8] dark:bg-[#101922] transition-colors duration-300 min-h-screen flex flex-col justify-center items-center p-4">

                <div className="w-full max-w-[480px] bg-white dark:bg-[#1C252E] rounded-xl shadow-lg border border-[#e5e7eb] dark:border-[#2e3740] p-6 sm:p-8 md:p-12 transition-colors duration-300">
                    <div className="size-full">
                        <Link href="/auth/login">
                            <button className="flex items-center text-[#617589] dark:text-[#9AAAB8] text-sm font-medium hover:underline mb-4">
                                <ArrowBigLeft className="mr-1 h-5 w-5" /> Back to Login
                            </button>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2 mb-6 sm:mb-8 text-center">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111418] dark:text-white">Forgot Password?</h1>
                        <p className="text-[#617589] dark:text-[#9AAAB8] text-sm">Enter your email address to receive a password reset link.</p>
                    </div>

                    <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal" htmlFor="email">
                                Email address
                            </label>
                            <div className="relative">
                                <input
                                    className="form-input w-full resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 border border-[#dbe0e6] dark:border-[#3e4a56] bg-white dark:bg-[#1C252E] focus:border-[#137fec] h-12 placeholder:text-[#617589] dark:placeholder:text-[#637588] px-4 pl-11 text-base font-normal leading-normal transition-colors"
                                    id="email"
                                    placeholder="name@gmail.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-11 text-[#617589]">
                                    <Mail size={20} />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#137fec] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#1170d2] transition-colors shadow-sm mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <span className="truncate">Send Reset Link</span>}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center text-xs text-[#617589] dark:text-[#9AAAB8]">
                    <p>© 2026 Developer Josjis.</p>
                </div>

            </div>
        </div>
    );
};

export default ForgotPasswordPage;
