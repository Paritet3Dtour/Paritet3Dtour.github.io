<?php  

   $method = $_SERVER['REQUEST_METHOD'];

$c = true;
if ( $method === 'POST' ) {

	   $datas = file_get_contents('events.json');

	   $datasDecoded = json_decode($datas, true);

	   echo($_POST[0]);
	
	   $json_array = $_POST['events'];
	   file_put_contents('events.json', json_encode($json_array));

}

?>