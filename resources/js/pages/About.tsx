import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Code, Heart, Shield, Target, Users, Zap } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'About',
        href: '/about',
    },
];

export default function About() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About - THC" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto max-w-4xl space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight">About THC</h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            The Hackers' Corner - Empowering the next generation of
                            cybersecurity professionals
                        </p>
                    </div>

                    {/* Mission */}
                    <Card>
                        <CardHeader>
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                <Target className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                THC (The Hackers' Corner) is dedicated to fostering a vibrant
                                ecosystem of cybersecurity enthusiasts, ethical hackers, and
                                technology innovators. Our mission is to:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    <span>
                                        Provide a platform for learning and practicing ethical
                                        hacking skills through hands-on CTF challenges
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    <span>
                                        Build a supportive community where members can share
                                        knowledge, collaborate, and grow together
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    <span>
                                        Promote ethical hacking practices and responsible disclosure
                                        in cybersecurity
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    <span>
                                        Bridge the gap between theoretical knowledge and practical
                                        cybersecurity skills
                                    </span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Values */}
                    <Card>
                        <CardHeader>
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                <Heart className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">Our Values</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-primary" />
                                        Ethical Practices
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        We emphasize ethical hacking, responsible disclosure, and
                                        using cybersecurity skills for positive impact.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <Users className="h-5 w-5 text-primary" />
                                        Community First
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        We believe in the power of community, collaboration, and
                                        knowledge sharing to advance cybersecurity.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <Zap className="h-5 w-5 text-primary" />
                                        Continuous Learning
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        We promote lifelong learning and staying updated with the
                                        latest cybersecurity trends and techniques.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <Code className="h-5 w-5 text-primary" />
                                        Hands-On Experience
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        We provide practical, real-world challenges that help members
                                        develop actual cybersecurity skills.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* What We Offer */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">What We Offer</CardTitle>
                            <CardDescription>
                                A comprehensive platform for cybersecurity enthusiasts
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2">CTF Arena</h3>
                                <p className="text-sm text-muted-foreground">
                                    Our Capture The Flag platform features challenges across multiple
                                    categories including web exploitation, cryptography, forensics,
                                    reverse engineering, and more. Compete with other members,
                                    track your progress, and climb the leaderboard.
                                </p>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="font-semibold mb-2">Learning Resources</h3>
                                <p className="text-sm text-muted-foreground">
                                    Access curated lists of cybersecurity tools, tutorials,
                                    documentation, and learning materials to enhance your skills and
                                    stay updated with industry best practices.
                                </p>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="font-semibold mb-2">Community Platform</h3>
                                <p className="text-sm text-muted-foreground">
                                    Connect with fellow hackers through our community channels. Join
                                    discussions, share knowledge, collaborate on projects, and learn
                                    from experienced members.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Join Us */}
                    <Card className="border-primary">
                        <CardHeader>
                            <CardTitle className="text-2xl">Join Us Today</CardTitle>
                            <CardDescription>
                                Become part of Tunisia's premier cybersecurity community
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-4">
                                Whether you're a beginner looking to learn the basics or an
                                experienced hacker wanting to share knowledge, THC welcomes you. Join
                                our community and start your cybersecurity journey today.
                            </p>
                            <div className="flex gap-4">
                                <a href="/community">
                                    <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                                        Join Community
                                    </button>
                                </a>
                                <a href="/ctf">
                                    <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                                        Explore CTF Arena
                                    </button>
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}