<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    public function index()
    {
        try {
            $projects = Project::where('status', 1)->orderBy('created_at', 'DESC')->get();
            return response()->json([
                'status' => true,
                'data' => $projects
            ]);
        } catch (\Exception $e) {
            Log::error('Échec de la récupération des projets : ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Échec de la récupération des projets',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function latestProjects(Request $request)
    {
        try {
            $limit = $request->get('limit', 3);

            $projects = Project::where('status', 1)
                ->take($limit)
                ->orderBy('created_at', 'DESC')->get();

            return response()->json([
                'status' => true,
                'data' => $projects
            ]);
        } catch (\Exception $e) {
            Log::error('Échec de la récupération des derniers projets : ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Échec de la récupération des derniers projets',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function project($id)
    {
        try {
            $project = Project::find($id);

            if ($project == null) {
                return response()->json([
                    'status' => false,
                    'message' => 'Projet introuvable'
                ]);
            }

            return response()->json([
                'status' => true,
                'data' => $project
            ]);
        } catch (\Exception $e) {
            Log::error('Échec de la récupération du projet : ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Échec de la récupération du projet',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
