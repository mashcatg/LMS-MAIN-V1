'use client';
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";


function DashboardWrapper() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const phone = searchParams.get('phone');

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://lms.ennovat.com/lms-admin/check_auth.php', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();

                if (data.logged_in) {
                    router.push('/admin/');
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const [formData, setFormData] = useState({ otp: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const urlEncodedData = new URLSearchParams();
        urlEncodedData.append('otp', formData.otp);

        try {
            const response = await fetch(`http://lms.ennovat.com/lms-admin/verify-otp.php?phone=${phone}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlEncodedData.toString(),
                credentials: 'include',
            });

            const data = await response.json();
            if (data.success) {
                router.push('/admin/');
            } else {
                setError(data.message || 'Invalid Credentials. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="w-full min-h-[100vh] lg:grid lg:grid-cols-2">
                <div className="hidden lg:block h-full w-full object-cover bg-primary"></div>
                <div className="flex items-center justify-center py-12">
                    <form onSubmit={handleSubmit} className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <div className="flex items-center justify-center mb-10">
                                <img src="/ennovat-logo.png" alt="Ennovat Logo" className="w-48" />
                            </div>
                            <h1 className="text-3xl font-bold">Confirm OTP</h1>
                            <p className="text-muted-foreground">
                                Check SMS and enter the OTP to verify your account.
                            </p>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="grid">
                            <div className="relative w-full my-3">
                                <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                                    OTP
                                </label>
                                <div className="flex items-center border rounded-md h-full w-full">
                                    <input
                                        type="text"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        className="text-md h-full w-full px-3 py-2"
                                        placeholder="XXXXXX"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="text-right text-sm mb-4 text-primary">
                                <Link href="/auth/admin/forgot-password/">Change Number</Link>
                            </div>
                            <Button type="submit" className="w-full">Confirm OTP</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Suspense>
    );
}

export default function Dashboard() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardWrapper />
      </Suspense>
    );
  }