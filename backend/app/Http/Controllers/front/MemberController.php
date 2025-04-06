<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MemberController extends Controller
{
    public function index()
    {
        try {
            $members = Member::where('status', 1)->orderBy('created_at', 'DESC')->get();
            return response()->json([
                'status' => true,
                'data' => $members
            ]);
        } catch (\Exception $e) {
            Log::error('Échec de la récupération des membres : ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Échec de la récupération des membres',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function latestMembers(Request $request)
    {
        try {
            $limit = $request->get('limit', 3);

            $members = Member::where('status', 1)
                ->take($limit)
                ->orderBy('created_at', 'DESC')->get();

            return response()->json([
                'status' => true,
                'data' => $members
            ]);
        } catch (\Exception $e) {
            Log::error('Échec de la récupération des derniers membres : ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Échec de la récupération des derniers membres',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function member($id)
    {
        try {
            $member = Member::find($id);

            if ($member == null) {
                return response()->json([
                    'status' => false,
                    'message' => 'Membre introuvable'
                ]);
            }

            return response()->json([
                'status' => true,
                'data' => $member
            ]);
        } catch (\Exception $e) {
            Log::error('Échec de la récupération du membre : ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Échec de la récupération du membre',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
