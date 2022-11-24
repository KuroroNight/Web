<?php

class Conexion{

    private $host;
    private $user;
    private $pw;
    private $nombreBD;

    public function __construct(){
        $this->host="localhost";
        $this->user="root";
        $this->pw="";
        $this->nombreBD="votacion";
    }

    public function conexion(){
        try {
            $dbConnection = new PDO("mysql:host=$this->host;dbname=$this->nombreBD;charset=utf8", $this->user, $this->pw);
            $dbConnection->exec("set names utf8");
            $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $dbConnection;
        }
        catch (PDOException $e) {
            return $e->getMessage();
        }
    }

    public function getNombreBD(){
        return $this->nombreBD;
    }

}