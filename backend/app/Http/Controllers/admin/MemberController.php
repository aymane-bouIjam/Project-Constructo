<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::all();

        return response()->json([
            'status' => true,
            'members' => $members,
        ]);
    }

    public function show($id)
    {
        $member = Member::find($id);

        if (!$member) {
            return response()->json([
                'status' => false,
                'message' => 'Membre non trouvé.',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'member' => $member,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'job_title' => 'required|string|max:255',
            'linkedin_url' => 'nullable|string|max:255',
            'image_id' => 'nullable|integer|exists:temp_images,id',
            'status' => 'required|integer',
        ]);

        $member = new Member();
        $member->fill($validated);

        if ($request->has('image_id') && $request->image_id > 0) {
            $this->handleImage($member, $request->image_id);
        }

        $member->save();

        return response()->json([
            'status' => true,
            'message' => 'Membre créé avec succès.',
            'member' => $member,
        ]);
    }

    public function update(Request $request, $id)
    {
        $member = Member::find($id);

        if (!$member) {
            return response()->json([
                'status' => false,
                'message' => 'Membre non trouvé.',
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'job_title' => 'sometimes|required|string|max:255',
            'linkedin_url' => 'nullable|string|max:255',
            'image_id' => 'nullable|integer|exists:temp_images,id',
            'status' => 'required|integer',
        ]);

        $member->fill($validated);

        if ($request->has('image_id') && $request->image_id > 0) {
            $this->handleImage($member, $request->image_id);
        }

        $member->save();

        return response()->json([
            'status' => true,
            'message' => 'Membre mis à jour avec succès.',
            'member' => $member,
        ]);
    }

    public function destroy($id)
    {
        $member = Member::find($id);

        if (!$member) {
            return response()->json([
                'status' => false,
                'message' => 'Membre non trouvé.',
            ], 404);
        }

        if ($member->image) {
            $this->deleteImage($member->image);
        }

        $member->delete();

        return response()->json([
            'status' => true,
            'message' => 'Membre supprimé avec succès.',
        ]);
    }

    private function handleImage(Member $member, $tempImageId)
    {
        $tempImage = TempImage::find($tempImageId);

        if ($tempImage) {
            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $destinationFolder = public_path('uploads/members/');
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

                $member->image_id = $tempImage->id;
                $member->image = $tempImage->name;

                $tempImage->used = true;
                $tempImage->save();
            } else {
                Log::error('Échec de la copie du fichier de ' . $sourcePath . ' à ' . $destinationPath);
                return response()->json([
                    'status' => false,
                    'message' => 'Échec du déplacement du fichier vers le dossier des membres',
                ], 500);
            }
        }
    }

    private function deleteImage($imageName)
    {
        $imagePath = public_path('uploads/members/' . $imageName);

        if (File::exists($imagePath)) {
            File::delete($imagePath);
        }
    }
}
