<?php

$data = json_decode(file_get_contents("php://input"), true);
//var_dump($data);


//$myJson = fopen('../json/test.json', 'w+');
//fwrite($myJson, $data['task']);
//fclose($myJson);


$inp = file_get_contents('../json/activite.json');
$tempArray = json_decode($inp, true);
$tempArray[0]['tasks'][] = ['name' => $data['task']];
$jsonData = json_encode($tempArray);
file_put_contents('../json/activite.json', $jsonData);