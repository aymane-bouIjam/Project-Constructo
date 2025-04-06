<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\TempImage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();

        return response()->json([
            'status' => true,
            'projects' => $projects,
        ]);
    }

    public function show($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Projet non trouvé',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'project' => $project,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects',
            'short_desc' => 'nullable|string',
            'content' => 'nullable|string',
            'construction_type' => 'nullable|string',
            'sector' => 'nullable|string',
            'location' => 'nullable|string',
            'image' => 'nullable|integer|exists:temp_images,id',
            'status' => 'required|integer',
        ]);

        $project = new Project();
        $project->fill($validated);

        if ($request->has('image') && $request->image > 0) {
            $this->handleImage($project, $request->image);
        }

        $project->save();

        return response()->json([
            'status' => true,
            'message' => 'Projet créé avec succès',
            'project' => $project,
        ]);
    }

    public function update(Request $request, $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Projet non trouvé',
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:projects,slug,' . $id,
            'short_desc' => 'nullable|string',
            'content' => 'nullable|string',
            'construction_type' => 'nullable|string',
            'sector' => 'nullable|string',
            'location' => 'nullable|string',
            'image' => 'nullable|integer|exists:temp_images,id',
            'status' => 'required|integer',
        ]);

        $project->fill($validated);

        if ($request->has('image') && $request->image > 0) {
            $this->handleImage($project, $request->image);
        }

        $project->save();

        return response()->json([
            'status' => true,
            'message' => 'Projet mis à jour avec succès',
            'project' => $project,
        ]);
    }

    public function destroy($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Projet non trouvé',
            ], 404);
        }

        if ($project->image) {
            $this->deleteImage($project->image);
        }

        $project->delete();

        return response()->json([
            'status' => true,
            'message' => 'Projet supprimé avec succès',
        ]);
    }

    private function handleImage(Project $project, $tempImageId)
    {
        $tempImage = TempImage::find($tempImageId);

        if ($tempImage) {
            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $destinationFolder = public_path('uploads/projects/');
            $destinationPath = $destinationFolder . $tempImage->name;

            Log::info('Vérification de l\'existence du fichier au chemin : ' . $sourcePath);

            if (!File::exists($sourcePath)) {
                Log::error('Le fichier source n\'existe pas : ' . $sourcePath);
                return response()->json([
                    'status' => false,
                    'message' => 'Le fichier source n\'existe pas dans le dossier temporaire',
                ], 400);
            }

            if (!File::exists($destinationFolder)) {
                File::makeDirectory($destinationFolder, 0755, true);
            }

            if (File::copy($sourcePath, $destinationPath)) {
                Log::info('Fichier copié avec succès de ' . $sourcePath . ' à ' . $destinationPath);

                $project->image_id = $tempImage->id;
                $project->image = $tempImage->name;

                $tempImage->used = true;
                $tempImage->save();
            } else {
                Log::error('Échec de la copie du fichier de ' . $sourcePath . ' à ' . $destinationPath);
                return response()->json([
                    'status' => false,
                    'message' => 'Échec du déplacement du fichier vers le dossier des projets',
                ], 500);
            }
        }
    }

    private function deleteImage($imageName)
    {
        $imagePath = public_path('uploads/projects/' . $imageName);

        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }
    }
}
