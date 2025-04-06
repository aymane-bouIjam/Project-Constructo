<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class PasswordResetMail extends Mailable
{
    public $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function build()
    {
        return $this->subject('Password Reset Request')
                    ->html($this->buildHtml());
    }

    protected function buildHtml()
    {
        $resetUrl = "http://localhost:5173/admin/reset-password?token={$this->token}";
        
        return "
            <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
            <a href='{$resetUrl}'>Réinitialiser</a>
        ";
    }
}
