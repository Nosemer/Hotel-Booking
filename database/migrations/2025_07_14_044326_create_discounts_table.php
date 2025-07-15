<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();
            $table->string('discount_code', 50)->nullable();
            $table->enum('type', ['percentage', 'fixed_amount']);
            $table->decimal('value', 10, 2);
            $table->enum('applicable_to', ['room_type', 'room', 'booking', 'branches']);
            $table->unsignedBigInteger('room_type_id')->nullable();
            $table->unsignedBigInteger('room_id')->nullable();
            $table->unsignedBigInteger('booking_id')->nullable();
            $table->unsignedBigInteger('branch_id')->nullable();
            $table->date('valid_from')->nullable();
            $table->date('valid_to')->nullable();
            $table->timestamps();

            // No foreign keys here
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
