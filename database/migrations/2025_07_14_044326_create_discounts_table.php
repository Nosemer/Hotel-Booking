<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('discounts', function (Blueprint $table) {
        $table->id();
        $table->string('discount_code', 50)->nullable();
        $table->enum('type', ['percentage', 'fixed_amount']);
        $table->decimal('value', 10, 2);
        $table->enum('applicable_to', ['room_type', 'room', 'booking', 'branches']);
        $table->string('room_type', 50)->nullable();
        $table->unsignedBigInteger('room_id')->nullable();
        $table->date('valid_from')->nullable();
        $table->date('valid_to')->nullable();
        $table->timestamps();

        $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
