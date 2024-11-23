"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://lms.ennovat.com/lms-admin/check_auth.php", {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                console.log(data);
                if (!data.logged_in) {
                    setLoading(false);
                } else {
                    router.push("/admin/");
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const [formData, setFormData] = useState({
        phone: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const urlEncodedData = new URLSearchParams();
        urlEncodedData.append("phone", formData.phone);
        urlEncodedData.append("password", formData.password);

        try {
            const response = await fetch("http://lms.ennovat.com/lms-admin/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: urlEncodedData.toString(),
                credentials: "include",
            });

            const data = await response.json();
            if (data.success) {
                // Server should set the token cookie
                router.push("/admin/");
            } else {
                setError(data.message || "Invalid Credentials. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Display a loading indicator
    }

    return (
        <div className="w-full min-h-[100vh] lg:grid lg:grid-cols-2">
            <div className="flex items-center justify-center py-12">
                <form onSubmit={handleSubmit} className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <div className="flex items-center justify-center mb-10">
                            <img src="/ennovat-logo.png" alt="Ennovat Logo" className="w-48" />
                        </div>
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-muted-foreground">
                            Enter your phone number and password to login
                        </p>
                    </div>
                    <div className="grid">
                        <div className="relative w-full my-3">
                            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                                Phone Number
                            </label>
                            <div className="flex items-center border rounded-md h-full w-full">
                                <span className="pl-3 pr-0 py-2 text-md text-gray-600 rounded-l-md">
                                    +88
                                </span>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="text-md h-full w-full px-3 py-2"
                                    placeholder="01XXX-XXXXXX"
                                    required
                                />
                            </div>
                        </div>

                        <div className="relative w-full my-3">
                            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border text-md h-full rounded-md w-full px-3 py-2"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="text-right text-sm mb-4 text-primary">
                            <Link href="/auth/admin/forgot-password/">Forgot Password?</Link>
                        </div>

                        {error && <p className="text-red-500 text-center">{error}</p>}

                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
            <div className="hidden lg:block h-full w-full object-cover bg-primary"></div>
        </div>
    );
}
