<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    // 🧾 Show all branches
    public function index()
{
    return response()->json(\App\Models\Branch::all());
}


    // 🆕 Store a new branch
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'address' => 'required|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip_code' => 'nullable|string|max:20',
        ]);

        $branch = Branch::create($validated);

        return response()->json(['message' => 'Branch created', 'branch' => $branch], 201);
    }

    // 🔍 Show a specific branch
    public function show($id)
    {
        $branch = Branch::findOrFail($id);
        return response()->json($branch);
    }

    // 📝 Update a branch
    public function update(Request $request, $id)
    {
        $branch = Branch::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'address' => 'required|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip_code' => 'nullable|string|max:20',
        ]);

        $branch->update($validated);

        return response()->json(['message' => 'Branch updated', 'branch' => $branch]);
    }

    // 🗑️ Delete a branch
    public function destroy($id)
    {
        $branch = Branch::findOrFail($id);
        $branch->delete();

        return response()->json(['message' => 'Branch deleted']);
    }
}
