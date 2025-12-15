<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Challenge;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class ChallengeController extends Controller
{
    /**
     * Display the admin dashboard with challenges and categories.
     */
    public function index(): Response
    {
        $challenges = Challenge::with('category')
            ->orderBy('created_at', 'desc')
            ->get();

        $categories = Category::orderBy('name')->get();

        return Inertia::render('Admin/Challenges', [
            'challenges' => $challenges,
            'categories' => $categories,
            'routes' => [
                'challengesBase' => route('admin.challenges.index'),
                'categoriesBase' => route('admin.categories.store'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Not used; admin creates challenges from the dashboard page.
    }

    /**
     * Store a newly created challenge.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'flag' => ['required', 'string', 'max:500'],
            'points' => ['required', 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $validated['flag'] = Hash::make($validated['flag']);
        $validated['is_active'] = $request->boolean('is_active');

        Challenge::create($validated);

        return redirect()->route('admin.challenges.index')->with('success', 'Challenge created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Not used in admin panel for now.
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Not used; editing happens inline from the dashboard via update.
    }

    /**
     * Update the specified challenge.
     */
    public function update(Request $request, Challenge $challenge): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'flag' => ['nullable', 'string', 'max:500'],
            'points' => ['required', 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $data = [
            'category_id' => $validated['category_id'],
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'points' => $validated['points'],
            'is_active' => $request->boolean('is_active'),
        ];

        if (! empty($validated['flag'])) {
            $data['flag'] = Hash::make($validated['flag']);
        }

        $challenge->update($data);

        return redirect()->route('admin.challenges.index')->with('success', 'Challenge updated successfully.');
    }

    /**
     * Remove the specified challenge.
     */
    public function destroy(Challenge $challenge): RedirectResponse
    {
        $challenge->delete();

        return redirect()->route('admin.challenges.index')->with('success', 'Challenge deleted successfully.');
    }
}

