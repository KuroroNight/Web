<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/** @var \Slim\App $app */

$obj = new Usuarios();

$app->post('/usuarios/register', function(Request $request, Response $response) use ($obj) {

    $data = $request->getParsedBody();

    $obj->initAgrega( $data );

    return $response->getBody()->write( json_encode( $obj->register() ) );

});

$app->post('/usuarios/login', function(Request $request, Response $response) use ($obj) {

    $data = $request->getParsedBody();

    $obj->initCambiaPass( $data );

    return $response->getBody()->write( json_encode( $obj->login() ) );

});

$app->post('/usuarios/plusOne', function(Request $request, Response $response) use ($obj) {

    $data = $request->getParsedBody();

    $obj->setCorreo( $data["correo"] );

    return $response->getBody()->write( json_encode( $obj->plusOne() ) );

});

$app->post('/usuarios/getEncontrados', function(Request $request, Response $response) use ($obj) {

    $data = $request->getParsedBody();

    $obj->setCorreo( $data["correo"] );

    return $response->getBody()->write( json_encode( $obj->getEncontrados() ) );

});

$app->post('/usuarios/cambiarPasswd', function(Request $request, Response $response) use ($obj) {

    $data = $request->getParsedBody();

    $obj->initCambiaPass( $data );

    return $response->getBody()->write( json_encode( $obj->changePass() ) );

});

$app->post('/usuarios/recovery', function(Request $request, Response $response) use ($obj) {

    $data = $request->getParsedBody();

    $obj->setCorreo( $data["correo"] );

    return $response->getBody()->write( json_encode( $obj->recovery() ) );

});

$app->post('/usuarios/verificar', function(Request $request, Response $response) use ($obj) {

    $data = $request->getParsedBody();

    $obj->setCorreo( $data["correo"] );

    return $response->getBody()->write( json_encode( $obj->verificar($data["codigo"]) ) );

});