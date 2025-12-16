import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import ctf from '@/routes/ctf';
import leaderboard from '@/routes/leaderboard';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2, Trophy, TrendingUp, Users } from 'lucide-react';
import { type SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    ctfStats?: {
        totalChallenges: number;
        solvedChallenges: number;
        totalPoints: number;
        rank?: number;
    };
}

export default function Dashboard({ ctfStats }: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const completionRate =
        ctfStats && ctfStats.totalChallenges > 0
            ? Math.round((ctfStats.solvedChallenges / ctfStats.totalChallenges) * 100)
            : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - THC" />
            <div className="flex h-full flex-1 flex-col gap-8 overflow-x-auto p-6">
                {/* Welcome Section */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        Welcome back, {user?.name}!
                    </h1>
                    <p className="text-muted-foreground">
                        Here's your overview of the CTF Arena and community activity.
                    </p>
                </div>

                {/* CTF Stats */}
                {ctfStats && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    Total Challenges
                                </CardTitle>
                                <Trophy className="h-5 w-5 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {ctfStats.totalChallenges}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {ctfStats.solvedChallenges} solved
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Your Score</CardTitle>
                                <TrendingUp className="h-5 w-5 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {ctfStats.totalPoints.toLocaleString()}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">Points earned</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Progress</CardTitle>
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{completionRate}%</div>
                                <p className="text-sm text-muted-foreground mt-1">Completion rate</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Rank</CardTitle>
                                <Users className="h-5 w-5 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {ctfStats.rank ? `#${ctfStats.rank}` : '—'}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">Leaderboard position</p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg mb-2">
                                <Trophy className="h-5 w-5 text-primary" />
                                CTF Arena
                            </CardTitle>
                            <CardDescription className="text-sm">
                                Explore challenges and test your hacking skills
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={ctf.index().url}>
                                <Button className="w-full">View Challenges</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg mb-2">
                                <Users className="h-5 w-5 text-primary" />
                                Leaderboard
                            </CardTitle>
                            <CardDescription className="text-sm">
                                See how you rank against other hackers
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={leaderboard.index().url}>
                                <Button variant="outline" className="w-full">
                                    View Rankings
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg mb-2">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                Your Progress
                            </CardTitle>
                            <CardDescription className="text-sm">
                                Track your solved challenges and achievements
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={ctf.index().url}>
                                <Button variant="outline" className="w-full">
                                    View Progress
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity or Tips */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg mb-2">Getting Started</CardTitle>
                        <CardDescription className="text-sm">
                            Tips to make the most of your CTF experience
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <div>
                                    <p className="text-sm font-medium mb-1">Start with Easy Challenges</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Begin with lower-point challenges to get familiar with the
                                        platform and build confidence.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <div>
                                    <p className="text-sm font-medium mb-1">Read Challenge Descriptions</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Pay attention to challenge descriptions and hints - they often
                                        contain valuable information.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <div>
                                    <p className="text-sm font-medium mb-1">Join the Community</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Connect with other hackers on Discord or Telegram for help and
                                        collaboration.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}