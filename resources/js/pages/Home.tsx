import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Code, Shield, Trophy, Users, Zap } from 'lucide-react';
import { dashboard, login, register } from '@/routes';
import ctf from '@/routes/ctf';
import leaderboard from '@/routes/leaderboard';
import { type SharedData } from '@/types';
import { motion } from 'framer-motion';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
];

export default function Home() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="THC - The Hackers' Corner" />
            <div className="flex h-full flex-1 flex-col overflow-x-hidden">
                {/* Hero Section */}
                <div className="relative overflow-hidden border-b bg-background">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
                    <div className="absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                    <div className="container relative mx-auto px-6 py-24 md:py-36">
                        <div className="mx-auto max-w-4xl text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                                    Welcome to{' '}
                                    <span className="text-gradient">THC</span>
                                </h1>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl max-w-2xl mx-auto"
                            >
                                The Hackers' Corner - A vibrant community of cybersecurity
                                enthusiasts, ethical hackers, and technology innovators dedicated to
                                advancing digital security knowledge.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mt-10 flex flex-wrap items-center justify-center gap-4"
                            >
                                {auth.user ? (
                                    <>
                                        <Link href={ctf.index().url}>
                                            <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                                                Explore CTF Arena
                                            </Button>
                                        </Link>
                                        <Link href={dashboard().url}>
                                            <Button size="lg" variant="outline" className="h-12 px-8 text-base glass hover:bg-accent/10">
                                                Go to Dashboard
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href={register().url}>
                                            <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                                                Join the Community
                                            </Button>
                                        </Link>
                                        <Link href={login().url}>
                                            <Button size="lg" variant="outline" className="h-12 px-8 text-base glass hover:bg-accent/10">
                                                Sign In
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="container mx-auto px-6 py-24">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
                        >
                            What We Do
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-muted-foreground"
                        >
                            We foster a collaborative environment for learning, sharing, and
                            advancing cybersecurity skills.
                        </motion.p>
                    </div>

                    <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "CTF Competitions",
                                description: "Participate in our Capture The Flag challenges covering web exploitation, cryptography, forensics, reverse engineering, and more.",
                                icon: Trophy,
                                link: ctf.index().url,
                                linkText: "View Challenges"
                            },
                            {
                                title: "Community Learning",
                                description: "Connect with fellow hackers, share knowledge, collaborate on projects, and grow together in a supportive environment.",
                                icon: Users,
                                link: "/community",
                                linkText: "Join Community"
                            },
                            {
                                title: "Resources & Tools",
                                description: "Access curated lists of cybersecurity tools, learning resources, and documentation to enhance your hacking skills.",
                                icon: Code,
                                link: "/resources",
                                linkText: "Browse Resources"
                            },
                            {
                                title: "Ethical Hacking",
                                description: "Learn ethical hacking practices, responsible disclosure, and contribute to making the digital world more secure.",
                                icon: Shield
                            },
                            {
                                title: "Skill Development",
                                description: "Improve your cybersecurity skills through hands-on challenges, workshops, and real-world scenarios.",
                                icon: Zap
                            },
                            {
                                title: "Leaderboard",
                                description: "Compete with other members, track your progress, and climb the rankings as you solve challenges.",
                                icon: Trophy,
                                link: leaderboard.index().url,
                                linkText: "View Leaderboard"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full glass-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-primary/10">
                                    <CardHeader>
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                                            <feature.icon className="h-7 w-7 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                                        <CardDescription className="text-base leading-relaxed">
                                            {feature.description}
                                        </CardDescription>
                                    </CardHeader>
                                    {feature.link && (
                                        <CardContent className="mt-auto">
                                            <Link href={feature.link}>
                                                <Button variant="outline" className="w-full group">
                                                    {feature.linkText}
                                                    <Zap className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                {!auth.user && (
                    <div className="border-t bg-muted/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
                        <div className="container relative mx-auto px-6 py-24">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="mx-auto max-w-3xl text-center bg-background/50 backdrop-blur-sm p-12 rounded-3xl border border-primary/10 shadow-2xl"
                            >
                                <h2 className="text-3xl font-bold tracking-tight mb-4">
                                    Ready to Start Hacking?
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Join our community today and start your cybersecurity journey.
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-4">
                                    <Link href={register().url}>
                                        <Button size="lg" className="h-12 px-8 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                                            Create Account
                                        </Button>
                                    </Link>
                                    <Link href={login().url}>
                                        <Button size="lg" variant="outline" className="h-12 px-8 text-base glass">
                                            Sign In
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

