<?php

namespace App\Database\Migrations;

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
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('instructor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->longText('content')->nullable();
            $table->string('cover_image_path')->nullable();
            $table->enum('type', ['online', 'offline']);
            $table->string('location')->nullable();
            $table->string('online_url')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('currency', 3)->default('JPY');
            $table->integer('duration_minutes');
            $table->integer('max_students')->default(1);
            $table->enum('difficulty_level', ['beginner', 'intermediate', 'advanced'])->default('beginner');
            $table->string('language', 5)->default('ja');
            $table->string('video_preview_path')->nullable();
            $table->enum('status', ['draft', 'pending', 'approved', 'rejected'])->default('draft');
            $table->boolean('is_featured')->default(false);
            $table->decimal('average_rating', 3, 2)->default(0.00);
            $table->integer('review_count')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
