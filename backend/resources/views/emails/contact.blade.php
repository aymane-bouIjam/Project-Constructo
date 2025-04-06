<!DOCTYPE html>
<html>
<body>
    <h1>Nouveau Message de {{ $contactData['name'] }}</h1>
    <p><strong>Email:</strong> {{ $contactData['email'] }}</p>
    <p><strong>Télé:</strong> {{ $contactData['phone'] }}</p>
    <p><strong>Sujet:</strong> {{ $contactData['subject'] }}</p>
    <p><strong>Message:</strong><br/> {{ $contactData['message'] }}</p>
</body>
</html>
