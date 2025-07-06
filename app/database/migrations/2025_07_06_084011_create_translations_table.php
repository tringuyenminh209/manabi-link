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
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->string('translatable_type'); // Model class name
            $table->unsignedBigInteger('translatable_id'); // Model ID
            $table->string('field'); // Field name (title, description, etc.)
            $table->string('locale', 5); // Language code (ja, vi, en)
            $table->text('value'); // Translated content
            $table->timestamps();

            // Indexes for better performance
            $table->index(['translatable_type', 'translatable_id']);
            $table->index(['locale']);
            $table->unique(['translatable_type', 'translatable_id', 'field', 'locale'], 'unique_translation');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('translations');
    }
};
