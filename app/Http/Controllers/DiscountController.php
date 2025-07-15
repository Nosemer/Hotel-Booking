<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use App\Models\Room;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    public function index()
    {
        $discounts = Discount::with('room')->get();
        return response()->json($discounts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'discount_code'   => 'nullable|string|max:50',
            'type'            => 'required|in:percentage,fixed_amount',
            'value'           => 'required|numeric|min:0',
            'applicable_to'   => 'required|in:room_type,room,booking,branches',
            'room_type'       => 'nullable|string|max:50',
            'room_id'         => 'nullable|exists:rooms,id',
            'valid_from'      => 'nullable|date',
            'valid_to'        => 'nullable|date|after_or_equal:valid_from',
        ]);

        Discount::create($validated);

        return response()->json(['message' => 'Discount created successfully.']);
    }

    public function destroy($id)
    {
        $discount = Discount::findOrFail($id);
        $discount->delete();

        return response()->json(['message' => 'Discount deleted successfully.']);
    }

    public function roomList()
    {
        return response()->json(Room::all());
    }
}
