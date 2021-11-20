<?php
#Receive user input
$email= $_POST['email'];
$firstname = $_POST['firstname'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$message = $_POST['message'];

#Send email
if (isset($firstname,$name,$email,$message)) {
	$headers = "From: $email";
	$sent = mail('yasser_dahy@hotmail.fr', 'Sender Informations', $firstname." ".$name." said :".$message, $headers);
}

#Thank user or notify them of a problem
if ($sent) {

?><html>
<head>
<title>Thank You</title>
</head>
<body>
<h1 style="color:green; font-family: 'Lato', sans-serif;">Thank you for your Message.</h1>
</body>
</html>
<?php

} else {

?><html>
<head>
<title>Something went wrong</title>
</head>
<body>
<h1 style="color:red; font-family: 'Lato', sans-serif;">Something went wrong</h1>
<p style="color:red; font-family: 'Lato', sans-serif;">We could not send your Message. Please try again.</p>
</body>
</html>
<?php
}
?>