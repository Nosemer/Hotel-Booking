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
    Schema::create('branches', function (Blueprint $table) {
        $table->id(); // auto-increment primary key
        $table->string('name', 100);
        $table->string('address', 255);
        $table->string('city', 100)->nullable();
        $table->string('state', 100)->nullable();
        $table->string('zip_code', 20)->nullable();
        $table->timestamps(); // created_at and updated_at
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branches');
    }
};
