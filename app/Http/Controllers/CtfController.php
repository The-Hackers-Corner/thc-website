<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Challenge;
use App\Models\Submission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CtfController extends Controller
{
    /**
     * Display a listing of all challenges grouped by category.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $categories = Category::with(['challenges' => function ($query) {
            $query->where('is_active', true)
                  ->orderBy('points', 'asc');
        }])->get();

        // Get solved challenge IDs for the authenticated user
        $solvedChallengeIds = [];
        if ($user) {
            $solvedChallengeIds = Submission::where('user_id', $user->id)
                ->where('is_correct', true)
                ->pluck('challenge_id')
                ->toArray();
        }

        return Inertia::render('ctf/List', [
            'categories' => $categories,
            'solvedChallengeIds' => $solvedChallengeIds,
        ]);
    }

    /**
     * Display the specified challenge.
     */
    public function show(Request $request, Challenge $challenge): Response
    {
        $user = $request->user();

        // Check if challenge is active
        if (!$challenge->is_active) {
            abort(404);
        }

        // Load category relationship
        $challenge->load('category');

        // Check if user has solved this challenge
        $hasSolved = false;
        $submission = null;
        if ($user) {
            $hasSolved = $user->hasSolved($challenge);
            $submission = Submission::where('user_id', $user->id)
                ->where('challenge_id', $challenge->id)
                ->where('is_correct', true)
                ->first();
        }

        // Get submission history for this challenge (user's own submissions)
        $submissions = [];
        if ($user) {
            $submissions = Submission::where('user_id', $user->id)
                ->where('challenge_id', $challenge->id)
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($sub) {
                    return [
                        'id' => $sub->id,
                        'submitted_flag' => $sub->submitted_flag,
                        'is_correct' => $sub->is_correct,
                        'created_at' => $sub->created_at->toDateTimeString(),
                    ];
                });
        }

        return Inertia::render('ctf/ChallengePlay', [
            'challenge' => [
                'id' => $challenge->id,
                'title' => $challenge->title,
                'description' => $challenge->description,
                'points' => $challenge->points,
                'category' => [
                    'id' => $challenge->category->id,
                    'name' => $challenge->category->name,
                    'slug' => $challenge->category->slug,
                ],
            ],
            'hasSolved' => $hasSolved,
            'submission' => $submission ? [
                'id' => $submission->id,
                'created_at' => $submission->created_at->toDateTimeString(),
            ] : null,
            'submissions' => $submissions,
        ]);
    }

    /**
     * Submit a flag for a challenge.
     */
    public function submit(Request $request, Challenge $challenge): RedirectResponse
    {
        $user = $request->user();

        if (!$user) {
            return back()->withErrors(['flag' => 'You must be logged in to submit flags.']);
        }

        // Check if challenge is active
        if (!$challenge->is_active) {
            return back()->withErrors(['flag' => 'This challenge is not active.']);
        }

        // Check if user has already solved this challenge
        if ($user->hasSolved($challenge)) {
            return back()->withErrors(['flag' => 'You have already solved this challenge.']);
        }

        $validated = $request->validate([
            'flag' => ['required', 'string', 'max:500'],
        ]);

        $submittedFlag = trim($validated['flag']);
        $isCorrect = $challenge->flagIsValid($submittedFlag);

        // Check if user has already submitted this exact flag (to prevent duplicate submissions)
        $existingSubmission = Submission::where('user_id', $user->id)
            ->where('challenge_id', $challenge->id)
            ->where('submitted_flag', $submittedFlag)
            ->first();

        if ($existingSubmission) {
            return back()->withErrors(['flag' => 'You have already submitted this flag.']);
        }

        // Create submission
        $submission = Submission::create([
            'user_id' => $user->id,
            'challenge_id' => $challenge->id,
            'submitted_flag' => $submittedFlag,
            'is_correct' => $isCorrect,
        ]);

        // If correct, award points (only on first correct submission)
        if ($isCorrect) {
            // Double-check we haven't already awarded points (race condition protection)
            $hasCorrectSubmission = Submission::where('user_id', $user->id)
                ->where('challenge_id', $challenge->id)
                ->where('is_correct', true)
                ->where('id', '!=', $submission->id)
                ->exists();

            if (!$hasCorrectSubmission) {
                $user->addScore($challenge->points);
            }
        }

        if ($isCorrect) {
            return back()->with('success', 'Congratulations! You solved the challenge and earned ' . $challenge->points . ' points!');
        }

        return back()->withErrors(['flag' => 'Incorrect flag. Try again!']);
    }
}

