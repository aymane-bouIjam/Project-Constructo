<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Str;
use App\Mail\PasswordResetMail;

class PasswordResetController extends Controller
{
    public function sendPasswordResetEmail(Request $request)
    {
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
                'message' => 'Utilisateur introuvable'
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
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
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
                'message' => 'Utilisateur introuvable'
            ], 404);
        }

        if ($user->password_reset_token !== $request->token || $user->password_reset_expires < now()) {
            return response()->json([
                'status' => false,
                'message' => 'Jeton invalide ou expiré'
            ], 400);
        }

        $user->password = Hash::make($request->password);

        $user->password_reset_token = null;
        $user->password_reset_expires = null;
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Mot de passe mis à jour avec succès'
        ], 200);
    }
}
