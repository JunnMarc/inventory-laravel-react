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
        Schema::create('parts', function (Blueprint $table) {
            $table->id()->primary();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->string('part_name', 64);
            $table->string('part_serial', 64);
            $table->decimal('unit_price', 10, 2)->nullable();
            $table->unsignedInteger('stock_threshold')->default(10);
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parts');
    }
};
