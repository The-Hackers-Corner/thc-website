import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ExternalLink, MessageCircle, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Community',
        href: '/community',
    },
];

interface CommunityLink {
    name: string;
    description: string;
    url: string;
    icon?: React.ReactNode;
}

const communityLinks: CommunityLink[] = [
    {
        name: 'Discord Server',
        description:
            'Join our Discord server for real-time discussions, help, and community events. Connect with fellow hackers and get support.',
        url: 'https://discord.gg/FZM4VYwU2W',
        icon: <MessageCircle className="h-5 w-5" />,
    },
    {
        name: 'GitHub Organization',
        description:
            'Contribute to open-source security tools and projects. Collaborate on community-driven initiatives.',
        url: 'https://github.com/The-Hackers-Corner',
    },
];

export default function Community() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Community - THC" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto max-w-4xl space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight">Join Our Community</h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Connect with fellow hackers, share knowledge, and grow together
                        </p>
                    </div>

                    {/* Community Links */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {communityLinks.map((link, index) => (
                            <Card key={index} className="flex flex-col">
                                <CardHeader>
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        {link.icon || <Users className="h-6 w-6 text-primary" />}
                                    </div>
                                    <CardTitle>{link.name}</CardTitle>
                                    <CardDescription>{link.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto">
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="w-full">
                                            Join {link.name}
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </Button>
                                    </a>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Community Guidelines */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Community Guidelines</CardTitle>
                            <CardDescription>
                                Help us maintain a positive and inclusive environment
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div>
                                    <h3 className="font-semibold mb-1">Be Respectful</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Treat all community members with respect and kindness.
                                        Harassment, discrimination, or any form of toxic behavior is
                                        not tolerated.
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="font-semibold mb-1">Ethical Practices</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Only use your hacking skills for ethical purposes. We promote
                                        responsible disclosure and legal hacking practices.
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="font-semibold mb-1">Share Knowledge</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Help others learn and grow. Share your knowledge, answer
                                        questions, and contribute to discussions constructively.
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="font-semibold mb-1">No Cheating</h3>
                                    <p className="text-sm text-muted-foreground">
                                        In CTF challenges, solve problems yourself. Sharing flags or
                                        solutions publicly is not allowed and may result in
                                        disqualification.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Get Involved */}
                    <Card className="border-primary">
                        <CardHeader>
                            <CardTitle className="text-2xl">Get Involved</CardTitle>
                            <CardDescription>
                                There are many ways to contribute to the community
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    <span>
                                        Participate in CTF challenges and share your write-ups
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    <span>Create and submit new challenges for others to solve</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    <span>Help organize community events and workshops</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    <span>Contribute to open-source security tools</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    <span>Mentor newcomers and share your expertise</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}