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
        Schema::create('lesson_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained('lessons')->onDelete('cascade');
            $table->timestamp('scheduled_at');
            $table->integer('duration_minutes')->default(60);
            $table->integer('max_students')->default(1);
            $table->integer('available_slots')->default(1);
            $table->string('meeting_url')->nullable();
            $table->string('location')->nullable();
            $table->string('status', 20)->default('available');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lesson_schedules');
    }
};
