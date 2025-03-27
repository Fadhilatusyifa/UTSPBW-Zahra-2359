<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $subject = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    $mail = new PHPMailer(true);

    try {
        // Konfigurasi SMTP Gmail
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'fadhilatusyifa@gmail.com'; // Ganti dengan email pengirim
        $mail->Password = 'yrax kjkb auck booi'; // Gunakan password atau App Password Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // *Tambahkan email penerima*
        $mail->addAddress('fadhilatusyifa@gmail.com'); // Ganti dengan email tujuan

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = "<h3>Pesan dari Contact Form</h3>
                          <p><strong>Nama:</strong> $name</p>
                          <p><strong>Email:</strong> $email</p>
                          <p><strong>Pesan:</strong></p>
                          <p>$message</p>";
        $mail->AltBody = "Nama: $name\nEmail: $email\n\nPesan:\n$message";

        $mail->send();
        echo json_encode(["status" => "success", "message" => "Pesan berhasil dikirim!"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Gagal mengirim pesan: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Akses tidak diizinkan!"]);
}
?>