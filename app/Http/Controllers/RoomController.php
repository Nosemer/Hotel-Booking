<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Branch;
use App\Models\RoomType;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    // Fetch data for the frontend
    public function index()
    {
        $rooms = Room::with(['branch', 'roomType'])->get();
        return response()->json($rooms);
    }

    // Store a new room
    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_number' => 'required|string|max:50',
            'capacity' => 'required|integer|min:1',
            'branch_id' => 'required|exists:branches,id',
            'room_type_id' => 'required|exists:room_types,id',
            'price' => 'required|numeric|min:0',
        ]);

        Room::create($validated);

        return response()->json(['message' => 'Room added successfully.'], 201);
    }

    // Optional: Delete a room
    public function destroy($id)
    {
        $room = Room::findOrFail($id);
        $room->delete();

        return response()->json(['message' => 'Room deleted successfully.']);
    }

    // Optional: Fetch branches and room types for dropdowns
    public function formData()
    {
        return response()->json([
            'branches' => Branch::all(),
            'roomTypes' => RoomType::all(),
        ]);
    }
}
