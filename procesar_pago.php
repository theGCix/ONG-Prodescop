<?php

require 'vendor/autoload.php';

\Culqi\Culqi::setApiKey("sk_test_xxxxx"); // luego cambias a sk_live

$input = json_decode(file_get_contents("php://input"), true);

try {
    $charge = \Culqi\Charge::create([
        "amount" => $input["amount"] * 100,
        "currency_code" => "PEN",
        "email" => "test@test.com",
        "source_id" => $input["token"]
    ]);

    echo json_encode(["status" => "ok", "data" => $charge]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}