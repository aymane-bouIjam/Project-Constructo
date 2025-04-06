<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ServiceController extends Controller
{
    public function index()
    {
        try {
            $services = Service::where('status', 1)->orderBy('created_at', 'DESC')->get();
            return response()->json([
                'status' => true,
                'data' => $services
            ]);
        } catch (\Exception $e) {
            Log::error('Échec de la récupération des services : ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Échec de la récupération des services',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function latestServices(Request $request)
    {
        try {
            $limit = $request->get('limit', 3);

            $services = Service::where('status', 1)
                ->take($limit)
                ->orderBy('created_at', 'DESC')->get();

            return response()->json([
                'status' => true,
                'data' => $services
            ]);
        } catch (\Exception $e) {
            Log::error('Échec de la récupération des derniers services : ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Échec de la récupération des derniers services',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function service($id)
    {
        try {
            $service = Service::find($id);

            if ($service == null) {
                return response()->json([
                    'status' => false,
                    'message' => 'Service introuvable'
                ]);
            }

            return response()->json([
                'status' => true,
                'data' => $service
            ]);
        } catch (\Exception $e) {
            Log::error('Échec de la récupération du service : ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Échec de la récupération du service',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
