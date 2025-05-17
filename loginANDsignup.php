<?php
header("Content-Type: application/json");
require_once 'db_connection.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Decode the JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate the action
if (!isset($input['action'])) {
    echo json_encode(['success' => false, 'message' => 'Action is required']);
    exit;
}

$action = $input['action'];

if ($action === 'login') {
    // Login validation
    if (empty($input['email']) || empty($input['password']) || empty($input['role'])) {
        echo json_encode(['success' => false, 'message' => 'Email, password, and role are required']);
        exit;
    }

    $email = $input['email'];
    $password = $input['password'];
    $role = $input['role'];

    $stmt = $conn->prepare("SELECT id, email, password FROM users WHERE email = ? AND role = ?");
    $stmt->bind_param("ss", $email, $role);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $token = bin2hex(random_bytes(16)); // Simple random token
            echo json_encode([
                'success' => true,
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'role' => $role
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid password']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }

    $stmt->close();

} elseif ($action === 'signup') {
    // Signup validation
    if (empty($input['name']) || empty($input['email']) || empty($input['password']) || empty($input['role'])) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }

    $name = $input['name'];
    $email = $input['email'];
    $hashedPassword = password_hash($input['password'], PASSWORD_BCRYPT);
    $role = $input['role'];
    $rescuerType = ($role === 'rescuer' && !empty($input['rescuerType'])) ? $input['rescuerType'] : NULL;

    // Check for existing email
    $checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();

    if ($checkResult->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already exists']);
        $checkStmt->close();
        exit;
    }
    $checkStmt->close();

    // Insert user
    $stmt = $conn->prepare("INSERT INTO users (full_name, email, password, role, rescuer_type) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $hashedPassword, $role, $rescuerType);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'User registered successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error registering user']);
    }

    $stmt->close();

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
}

$conn->close();
?>
