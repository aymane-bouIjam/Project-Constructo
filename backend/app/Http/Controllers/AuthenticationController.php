<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordResetMail;

class AuthenticationController extends Controller
{
    public function authenticate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            $needsPasswordChange = $user->temporary_password;

            return response()->json([
                'status' => true,
                'message' => 'Authentification réussie',
                'token' => $token,
                'id' => $user->id,
                'needs_password_change' => $needsPasswordChange,
            ], 200);
        }

        return response()->json([
            'status' => false,
            'message' => 'Identifiants invalides',
        ], 401);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|min:6',
        ]);

        $user = Auth::user();

        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'L\'ancien mot de passe est incorrect',
            ], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->temporary_password = false;
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Mot de passe changé avec succès',
        ], 200);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Déconnexion réussie'
        ], 200);
    }

    public function sendPasswordResetEmail(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
            ]);
    
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()
                ], 422);
            }
    
            $user = User::where('email', $request->email)->first();
    
            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'Utilisateur non trouvé'
                ], 404);
            }
    
            $token = Str::random(64);
            $user->password_reset_token = $token;
            $user->password_reset_expires = now()->addHour();
            $user->save();
    
            Mail::to($user->email)->send(new PasswordResetMail($token));

            return response()->json([
                'status' => true,
                'message' => 'Email de réinitialisation du mot de passe envoyé avec succès',
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Erreur dans sendPasswordResetEmail: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Quelque chose s\'est mal passé. Veuillez réessayer plus tard.',
            ], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }
    
        $user = User::where('password_reset_token', $request->token)
            ->where('password_reset_expires', '>', now())
            ->first();
    
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Token invalide ou expiré',
            ], 400);
        }
    
        $user->password = Hash::make($request->new_password);
        $user->password_reset_token = null;
        $user->password_reset_expires = null;
        $user->temporary_password = false;
        $user->save();
    
        \Log::info('Nouveau mot de passe hashé : ' . $user->password);
    
        return response()->json([
            'status' => true,
            'message' => 'Mot de passe mis à jour avec succès',
        ], 200);
    }
}
