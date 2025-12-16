import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle2, Lock, Trophy } from 'lucide-react';
import ctf from '@/routes/ctf';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'CTF Arena',
        href: ctf.index().url,
    },
];

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    challenges: Challenge[];
}

interface Challenge {
    id: number;
    title: string;
    description: string;
    points: number;
    is_active: boolean;
}

interface CtfListProps {
    categories: Category[];
    solvedChallengeIds: number[];
}

export default function CtfList({ categories, solvedChallengeIds }: CtfListProps) {
    const totalChallenges = categories.reduce((sum, cat) => sum + cat.challenges.length, 0);
    const totalSolved = solvedChallengeIds.length;
    const totalPoints = categories.reduce(
        (sum, cat) =>
            sum +
            cat.challenges
                .filter((ch) => solvedChallengeIds.includes(ch.id))
                .reduce((pts, ch) => pts + ch.points, 0),
        0,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CTF Arena" />
            <div className="flex h-full flex-1 flex-col gap-8 overflow-x-auto p-6">
                {/* Header Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Challenges</CardTitle>
                            <Trophy className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalChallenges}</div>
                            <p className="text-sm text-muted-foreground mt-1">
                                {totalSolved} solved
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Points</CardTitle>
                            <Trophy className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalPoints}</div>
                            <p className="text-sm text-muted-foreground mt-1">
                                Points earned
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Progress</CardTitle>
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {totalChallenges > 0
                                    ? Math.round((totalSolved / totalChallenges) * 100)
                                    : 0}
                                %
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                                Completion rate
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Categories and Challenges */}
                <div className="space-y-8">
                    {categories.map((category) => (
                        <Card key={category.id} className="border-border/50">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-semibold">{category.name}</CardTitle>
                                {category.description && (
                                    <CardDescription className="mt-2">{category.description}</CardDescription>
                                )}
                            </CardHeader>
                            <CardContent>
                                {category.challenges.length === 0 ? (
                                    <p className="text-sm text-muted-foreground py-4">
                                        No active challenges in this category yet.
                                    </p>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {category.challenges.map((challenge) => {
                                            const isSolved = solvedChallengeIds.includes(challenge.id);
                                            return (
                                                <Link
                                                    key={challenge.id}
                                                    href={ctf.challenges.show(challenge.id).url}
                                                    className="group"
                                                >
                                                    <Card
                                                        className={`transition-all hover:shadow-md hover:border-primary/40 h-full ${
                                                            isSolved
                                                                ? 'border-emerald-500/70 bg-emerald-500/5 dark:bg-emerald-500/10'
                                                                : 'border-border/60 bg-background'
                                                        }`}
                                                    >
                                                        <CardHeader className="pb-3">
                                                            <div className="flex items-start justify-between gap-2">
                                                                <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors flex-1">
                                                                    {challenge.title}
                                                                </CardTitle>
                                                                {isSolved && (
                                                                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500 shrink-0" />
                                                                )}
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent className="space-y-3">
                                                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                                                {challenge.description}
                                                            </p>
                                                            <div className="flex items-center justify-between pt-2">
                                                                <Badge
                                                                    variant={isSolved ? 'default' : 'secondary'}
                                                                    className={
                                                                        isSolved
                                                                            ? 'font-medium bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-emerald-50'
                                                                            : 'font-medium'
                                                                    }
                                                                >
                                                                    {challenge.points} pts
                                                                </Badge>
                                                                {isSolved ? (
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="border-emerald-500 text-emerald-600 dark:text-emerald-400"
                                                                    >
                                                                        Solved
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="border-amber-500 text-amber-600 dark:text-amber-400"
                                                                    >
                                                                        Unsolved
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {categories.length === 0 && (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No Challenges Available</h3>
                            <p className="text-sm text-muted-foreground">
                                Check back later for new challenges!
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}