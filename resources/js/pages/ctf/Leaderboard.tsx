import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Crown, Medal, Trophy, User } from 'lucide-react';
import leaderboard from '@/routes/leaderboard';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leaderboard',
        href: leaderboard.index().url,
    },
];

interface UserRank {
    rank: number;
    id: number;
    name: string;
    score: number;
}

interface LeaderboardProps {
    users: UserRank[];
    userRank: UserRank | null;
}

function getRankIcon(rank: number) {
    if (rank === 1) {
        return <Crown className="h-5 w-5 text-yellow-500" />;
    }
    if (rank === 2) {
        return <Medal className="h-5 w-5 text-gray-400" />;
    }
    if (rank === 3) {
        return <Medal className="h-5 w-5 text-amber-600" />;
    }
    return null;
}

function getRankBadgeVariant(rank: number) {
    if (rank === 1) return 'default';
    if (rank === 2) return 'secondary';
    if (rank === 3) return 'outline';
    return 'outline';
}

export default function Leaderboard({ users, userRank }: LeaderboardProps) {
    const topThree = users.slice(0, 3);
    const rest = users.slice(3);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leaderboard - CTF Arena" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
                        <p className="text-muted-foreground mt-2">
                            Top performers in the CTF Arena
                        </p>
                    </div>

                    {/* Top 3 Podium */}
                    {topThree.length > 0 && (
                        <div className="grid gap-4 md:grid-cols-3">
                            {topThree.map((user, index) => {
                                const isSecond = index === 1;
                                const _isThird = index === 2;
                                const isFirst = index === 0;

                                return (
                                    <Card
                                        key={user.id}
                                        className={`relative ${
                                            isFirst
                                                ? 'md:order-2 border-yellow-500 dark:border-yellow-600'
                                                : isSecond
                                                  ? 'md:order-1'
                                                  : _isThird
                                                    ? 'md:order-3'
                                                    : ''
                                        }`}
                                    >
                                        <CardHeader className="text-center pb-2">
                                            <div className="flex justify-center mb-2">
                                                {getRankIcon(user.rank)}
                                            </div>
                                            <Avatar className="h-16 w-16 mx-auto mb-2">
                                                <AvatarFallback className="text-lg">
                                                    {user.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')
                                                        .toUpperCase()
                                                        .slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <CardTitle className="text-lg">{user.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-center space-y-2">
                                            <div className="flex items-center justify-center gap-2">
                                                <Trophy className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-2xl font-bold">
                                                    {user.score.toLocaleString()}
                                                </span>
                                            </div>
                                            <Badge variant={getRankBadgeVariant(user.rank)}>
                                                #{user.rank}
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}

                    {/* Rest of the Leaderboard */}
                    {rest.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>All Rankings</CardTitle>
                                <CardDescription>
                                    Complete leaderboard of all participants
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {rest.map((user) => {
                                        const isCurrentUser =
                                            userRank && user.id === userRank.id;
                                        return (
                                            <div
                                                key={user.id}
                                                className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                                                    isCurrentUser
                                                        ? 'bg-primary/5 border-primary'
                                                        : 'hover:bg-accent'
                                                }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center justify-center w-10">
                                                        <span
                                                            className={`text-sm font-medium ${
                                                                isCurrentUser
                                                                    ? 'text-primary font-bold'
                                                                    : 'text-muted-foreground'
                                                            }`}
                                                        >
                                                            #{user.rank}
                                                        </span>
                                                    </div>
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarFallback>
                                                            {user.name
                                                                .split(' ')
                                                                .map((n) => n[0])
                                                                .join('')
                                                                .toUpperCase()
                                                                .slice(0, 2)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p
                                                            className={`font-medium ${
                                                                isCurrentUser ? 'text-primary' : ''
                                                            }`}
                                                        >
                                                            {user.name}
                                                            {isCurrentUser && (
                                                                <Badge variant="outline" className="ml-2">
                                                                    You
                                                                </Badge>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Trophy className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-semibold">
                                                        {user.score.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Current User Rank (if not in top 100) */}
                    {userRank && !users.find((u) => u.id === userRank.id) && (
                        <Card className="border-primary">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Your Rank
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-10">
                                            <span className="text-lg font-bold text-primary">
                                                #{userRank.rank}
                                            </span>
                                        </div>
                                        <Avatar className="h-12 w-12">
                                            <AvatarFallback>
                                                {userRank.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')
                                                    .toUpperCase()
                                                    .slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-primary">
                                                {userRank.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Trophy className="h-5 w-5 text-primary" />
                                        <span className="text-xl font-bold text-primary">
                                            {userRank.score.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {users.length === 0 && (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No Rankings Yet</h3>
                                <p className="text-sm text-muted-foreground">
                                    Be the first to solve a challenge and appear on the leaderboard!
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

