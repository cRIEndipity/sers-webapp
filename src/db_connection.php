<?php
// Database connection parameters
$servername = "localhost";  // Database server (localhost for local)
$username = "root";         // XAMPP default username
$password = "03192005";             // Default XAMPP password (empty)
$dbname = "SERS_db";        // Database name (SERS_db)

// Create connection using MySQLi
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);  // Output error if connection fails
} else {
    // Optional: Connection successful message (you can remove this later in production)
    // echo "Connected successfully to the SERS_db database";
}
?>
