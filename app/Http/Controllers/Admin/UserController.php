<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * redirect to admin dashboard since list is there.
     */
    public function index(): RedirectResponse
    {
        return redirect()->route('admin.index');
    }

    /**
     * Update the specified user (e.g., toggle admin status).
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        // Prevent modifying self if currently authenticated user is targeted? 
        // Admin.tsx handles disabling the button, but good to have backend check.
        if ($request->user()->id === $user->id) {
            return back()->with('error', 'You cannot modify your own administrative privileges.');
        }

        $validated = $request->validate([
            'is_admin' => ['required', 'boolean'],
        ]);

        $user->update([
            'is_admin' => $validated['is_admin'],
        ]);

        return back()->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user.
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($request->user()->id === $user->id) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return back()->with('success', 'User deleted successfully.');
    }
}
