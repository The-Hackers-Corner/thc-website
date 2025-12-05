import InputError from '@/components/input-error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2, Flag, Trophy, XCircle } from 'lucide-react';
import ctf from '@/routes/ctf';
import { Transition } from '@headlessui/react';

interface Challenge {
    id: number;
    title: string;
    description: string;
    points: number;
    category: {
        id: number;
        name: string;
        slug: string;
    };
}

interface Submission {
    id: number;
    submitted_flag: string;
    is_correct: boolean;
    created_at: string;
}

interface ChallengePlayProps {
    challenge: Challenge;
    hasSolved: boolean;
    submission: {
        id: number;
        created_at: string;
    } | null;
    submissions: Submission[];
}

export default function ChallengePlay({
    challenge,
    hasSolved,
    submission,
    submissions,
}: ChallengePlayProps) {
    const { flash, errors } = usePage().props as {
        flash?: { success?: string };
        errors?: { flag?: string };
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'CTF Arena',
            href: ctf.index().url,
        },
        {
            title: challenge.title,
            href: ctf.challenges.show(challenge.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${challenge.title} - CTF Arena`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Challenge Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1.5">
                                        <CardTitle className="text-2xl">{challenge.title}</CardTitle>
                                        <CardDescription>{challenge.category.name}</CardDescription>
                                    </div>
                                    <Badge variant="secondary" className="text-base px-3 py-1">
                                        <Trophy className="h-4 w-4 mr-1" />
                                        {challenge.points} points
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Separator />
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                        {challenge.description}
                                    </p>
                                </div>

                                {hasSolved && (
                                    <Alert className="border-emerald-600 bg-emerald-50 dark:bg-emerald-950/20">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                                        <AlertTitle className="text-emerald-900 dark:text-emerald-100">
                                            Challenge Solved!
                                        </AlertTitle>
                                        <AlertDescription className="text-emerald-800 dark:text-emerald-200">
                                            Congratulations! You solved this challenge and earned{' '}
                                            {challenge.points} points on{' '}
                                            {submission
                                                ? new Date(submission.created_at).toLocaleDateString()
                                                : ''}
                                            .
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>

                        {/* Submission History */}
                        {submissions.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Submission History</CardTitle>
                                    <CardDescription>
                                        Your previous attempts for this challenge
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {submissions.map((sub) => (
                                            <div
                                                key={sub.id}
                                                className="flex items-center justify-between rounded-md border p-3"
                                            >
                                                <div className="flex items-center gap-3">
                                                    {sub.is_correct ? (
                                                        <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500 shrink-0" />
                                                    ) : (
                                                        <XCircle className="h-5 w-5 text-destructive shrink-0" />
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-mono">
                                                            {sub.submitted_flag}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {new Date(sub.created_at).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge
                                                    variant={
                                                        sub.is_correct ? 'default' : 'destructive'
                                                    }
                                                    className={
                                                        sub.is_correct
                                                            ? 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700'
                                                            : ''
                                                    }
                                                >
                                                    {sub.is_correct ? 'Correct' : 'Incorrect'}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Flag Submission Form */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Flag className="h-5 w-5" />
                                    Submit Flag
                                </CardTitle>
                                <CardDescription>
                                    {hasSolved
                                        ? 'You have already solved this challenge'
                                        : 'Enter the flag you found'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {hasSolved ? (
                                    <div className="text-center py-8">
                                        <CheckCircle2 className="h-16 w-16 text-emerald-600 dark:text-emerald-500 mx-auto mb-4" />
                                        <p className="text-sm text-muted-foreground">
                                            You've already solved this challenge!
                                        </p>
                                        <Link href={ctf.index().url}>
                                            <Button variant="outline" className="mt-4">
                                                View Other Challenges
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <Form
                                        {...ctf.challenges.submit.form(challenge.id)}
                                        className="space-y-4"
                                    >
                                        {({ processing, recentlySuccessful }) => (
                                            <>
                                                {flash?.success && (
                                                    <Alert className="border-emerald-600 bg-emerald-50 dark:bg-emerald-950/20">
                                                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
                                                        <AlertTitle className="text-emerald-900 dark:text-emerald-100">
                                                            Success!
                                                        </AlertTitle>
                                                        <AlertDescription className="text-emerald-800 dark:text-emerald-200">
                                                            {flash.success}
                                                        </AlertDescription>
                                                    </Alert>
                                                )}

                                                <div className="space-y-2">
                                                    <Label htmlFor="flag">Flag</Label>
                                                    <Input
                                                        id="flag"
                                                        name="flag"
                                                        type="text"
                                                        placeholder="THC{...}"
                                                        required
                                                        disabled={processing}
                                                        className="font-mono"
                                                        aria-invalid={errors?.flag ? 'true' : undefined}
                                                    />
                                                    <InputError message={errors?.flag} />
                                                </div>

                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="w-full"
                                                >
                                                    {processing ? 'Submitting...' : 'Submit Flag'}
                                                </Button>

                                                <Transition
                                                    show={recentlySuccessful}
                                                    enter="transition ease-in-out"
                                                    enterFrom="opacity-0"
                                                    leave="transition ease-in-out"
                                                    leaveTo="opacity-0"
                                                >
                                                    <p className="text-sm text-emerald-600 dark:text-emerald-500 text-center">
                                                        Flag submitted!
                                                    </p>
                                                </Transition>
                                            </>
                                        )}
                                    </Form>
                                )}
                            </CardContent>
                        </Card>

                        {/* Challenge Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Challenge Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Category:</span>
                                    <span className="font-medium">{challenge.category.name}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Points:</span>
                                    <span className="font-medium">{challenge.points} pts</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Status:</span>
                                    <Badge
                                        variant={hasSolved ? 'default' : 'outline'}
                                        className={
                                            hasSolved
                                                ? 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-emerald-50'
                                                : 'border-amber-500 text-amber-600 dark:text-amber-400'
                                        }
                                    >
                                        {hasSolved ? 'Solved' : 'Unsolved'}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

