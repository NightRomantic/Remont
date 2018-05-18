<?php
  
  if($_POST){
    $message = $_POST['name'] + " " + $_POST['phone'] + " " + $_POST['email'] 
  }
  
  $to = 'nightromantic63@gmail.com';
  $subject = 'Заявка с сайта'
  mail( $to, $subject $message );



?>