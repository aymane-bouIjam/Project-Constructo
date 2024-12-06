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
        Schema::dropIfExists('services');
        Schema::dropIfExists('temp_images');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Recreate tables in the down method if necessary
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->string('short_desc')->nullable();
            $table->text('content')->nullable();
            $table->string('image')->nullable();
            $table->integer('status')->default(1);
            $table->timestamps();
        });

        Schema::create('temp_images', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->timestamps();
        });
    }
};
