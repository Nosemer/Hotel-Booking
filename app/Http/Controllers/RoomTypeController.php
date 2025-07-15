<?php

namespace App\Http\Controllers;

use App\Models\RoomType;
use Illuminate\Http\Request;

class RoomTypeController extends Controller
{
    // Return all room types
    public function index()
    {
        return response()->json(RoomType::all());
    }

    // Store new room type
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string|max:255',
        ]);

        RoomType::create($validated);

        return response()->json(['message' => 'Room type added successfully.'], 201);
    }

    // Delete a room type
    public function destroy($id)
    {
        $roomType = RoomType::findOrFail($id);
        $roomType->delete();

        return response()->json(['message' => 'Room type deleted successfully.']);
    }
}
