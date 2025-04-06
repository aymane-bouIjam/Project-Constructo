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
      
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('job_title');
            $table->string('linkedin_url')->nullable();
            $table->unsignedBigInteger('image_id')->nullable(); 
            $table->integer('status')->default(1);
            $table->timestamps();

         
            $table->foreign('image_id')->references('id')->on('temp_images')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
