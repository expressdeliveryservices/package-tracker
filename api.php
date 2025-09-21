<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Location of the JSON storage
$dataFile = __DIR__ . "/data.json";

// If file doesn't exist, create it
if(!file_exists($dataFile)){
    file_put_contents($dataFile, json_encode([]));
}

// Load existing data
$data = json_decode(file_get_contents($dataFile), true);

// Ensure $data is array
if(!is_array($data)){
    $data = [];
}

// Action from query
$action = $_GET['action'] ?? '';

// ✅ GET shipment details
if($action === "get" && isset($_GET['code'])){
    $code = $_GET['code'];
    if(isset($data[$code])){
        echo json_encode($data[$code]);
    } else {
        echo json_encode(["error" => "Tracking code not found"]);
    }
    exit;
}

// ✅ ADD new tracking code
if($action === "add" && isset($_GET['code'])){
    $code = $_GET['code'];
    if(!isset($data[$code])){
        $data[$code] = [
            "code" => $code,
            "status" => "Registered",
            "airport" => "NEW YORK JFK AIRPORT",
            "name" => "Receiver Pending",
            "address" => "Address Pending",
            "last_update" => date("Y-m-d H:i:s")
        ];
        file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
        echo json_encode(["success" => "Tracking code $code created"]);
    } else {
        echo json_encode(["error" => "Code already exists"]);
    }
    exit;
}

// ✅ UPDATE shipment details
if($action === "update"){
    $input = json_decode(file_get_contents("php://input"), true);
    if(isset($input['code']) && isset($data[$input['code']])){
        $code = $input['code'];
        if(isset($input['status'])) $data[$code]['status'] = $input['status'];
        if(isset($input['airport'])) $data[$code]['airport'] = strtoupper($input['airport']);
        if(isset($input['name'])) $data[$code]['name'] = $input['name'];
        if(isset($input['address'])) $data[$code]['address'] = $input['address'];
        $data[$code]['last_update'] = date("Y-m-d H:i:s");
        
        file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
        echo json_encode(["success" => "Tracking details updated"]);
    } else {
        echo json_encode(["error" => "Invalid code"]);
    }
    exit;
}

echo json_encode(["error" => "Invalid request"]);
