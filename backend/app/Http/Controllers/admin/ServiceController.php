<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\TempImage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();

        return response()->json([
            'status' => true,
            'services' => $services,
        ]);
    }

    public function show($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service non trouvé',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'service' => $service,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:services',
            'short_desc' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|integer|exists:temp_images,id',
            'status' => 'required|integer',
        ]);

        $service = new Service();
        $service->fill($validated);
      
        try {
            if ($request->has('image') && $request->image > 0) {
                $this->handleImage($service, $request->image);
            }
            $service->save();

            return response()->json([
                'status' => true,
                'message' => 'Service créé avec succès',
                'service' => $service,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erreur: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service non trouvé',
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:services,slug,' . $id,
            'short_desc' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|integer|exists:temp_images,id',
            'status' => 'required|integer',
        ]);

        $service->fill($validated);
        Log::info($request->all());
        try {
            if ($request->has('image') && $request->image > 0) {
                $this->handleImage($service, $request->image);
            }
            $service->save();

            return response()->json([
                'status' => true,
                'message' => 'Service mis à jour avec succès',
                'service' => $service,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erreur: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service non trouvé',
            ], 404);
        }

        try {
            if ($service->image) {
                $this->deleteImage($service->image);
            }

            $service->delete();

            return response()->json([
                'status' => true,
                'message' => 'Service supprimé avec succès',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erreur: ' . $e->getMessage(),
            ], 500);
        }
    }

    private function handleImage(Service $service, $tempImageId)
    {
        Log::info('image');
        $tempImage = TempImage::find($tempImageId);
        
        if ($tempImage) {
            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $destinationFolder = public_path('uploads/services/');
            $destinationPath = $destinationFolder . $tempImage->name;
            
         
            if (!file_exists($sourcePath)) {
                Log::error('Le fichier source n\'existe pas : ' . $sourcePath);
                return false;
            }
            
           
            if (!file_exists($destinationFolder)) {
                mkdir($destinationFolder, 0755, true);
            }
            
    
            if (copy($sourcePath, $destinationPath)) {
                Log::info('Fichier copié avec succès de ' . $sourcePath . ' à ' . $destinationPath);
                
            
                $service->image_id = $tempImage->id;
                $service->image = $tempImage->name;
                
               
                $tempImage->used = true;
                $tempImage->save();
                
                return true;
            } else {
                Log::error('Échec de la copie du fichier de ' . $sourcePath . ' à ' . $destinationPath);
                return false;
            }
        }
        
        return false;
    }
    
   
    private function deleteImage($imageName)
    {
        $imagePath = public_path('uploads/services/' . $imageName);
        
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }
    }
    
}
