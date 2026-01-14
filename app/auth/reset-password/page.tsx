'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowBigLeft, Loader2, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            toast.error('Invalid or missing token');
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (!token) {
            toast.error('Missing reset token');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            toast.success('Password reset successfully! You can now login.');
            router.push('/auth/login');
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="text-center text-red-500">
                <p>Invalid or missing token. Please check your email link.</p>
                <Link href="/auth/forgot-password" className="text-[#137fec] hover:underline mt-2 block">
                    Request a new link
                </Link>
            </div>
        );
    }

    return (
        <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal" htmlFor="password">
                    New Password
                </label>
                <div className="relative">
                    <input
                        className="form-input w-full resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 border border-[#dbe0e6] dark:border-[#3e4a56] bg-white dark:bg-[#1C252E] focus:border-[#137fec] h-12 placeholder:text-[#617589] dark:placeholder:text-[#637588] px-4 pl-11 pr-12 text-base font-normal leading-normal transition-colors"
                        id="password"
                        placeholder="New password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                    <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-11 text-[#617589]">
                        <Lock size={20} />
                    </div>
                    <div
                        className="absolute right-0 top-0 bottom-0 flex items-center justify-center w-12 text-[#617589] cursor-pointer hover:text-[#137fec] transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal" htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        className="form-input w-full resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 border border-[#dbe0e6] dark:border-[#3e4a56] bg-white dark:bg-[#1C252E] focus:border-[#137fec] h-12 placeholder:text-[#617589] dark:placeholder:text-[#637588] px-4 pl-11 pr-12 text-base font-normal leading-normal transition-colors"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                    <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-11 text-[#617589]">
                        <Lock size={20} />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#137fec] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#1170d2] transition-colors shadow-sm mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 className="animate-spin" /> : <span className="truncate">Reset Password</span>}
            </button>
        </form>
    );
};

const ResetPasswordPage = () => {
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
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111418] dark:text-white">Reset Password</h1>
                        <p className="text-[#617589] dark:text-[#9AAAB8] text-sm">Enter your new password below.</p>
                    </div>

                    <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>}>
                        <ResetPasswordForm />
                    </Suspense>

                </div>

                <div className="mt-8 text-center text-xs text-[#617589] dark:text-[#9AAAB8]">
                    <p>© 2026 Developer Josjis.</p>
                </div>

            </div>
        </div>
    );
};

export default ResetPasswordPage;
