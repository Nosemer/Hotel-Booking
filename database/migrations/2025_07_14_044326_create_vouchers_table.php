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
    Schema::create('vouchers', function (Blueprint $table) {
        $table->id();
        $table->string('voucher_code', 50)->unique();
        $table->foreignId('discount_id')->constrained('discounts')->onDelete('cascade');
        $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
        $table->integer('usage_limit')->default(1);
        $table->integer('used_count')->default(0);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
