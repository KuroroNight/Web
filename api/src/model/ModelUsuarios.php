<?php

declare(strict_types=1);

class Usuarios{

    private $Id;
    private $Nombre;
    private $Password;
    private $Curp;
    private $Foto;


    public function initAgrega(array $data):void{ 
        $this->Nombre = $data["Nombre"]; 
        $this->Password = $data["Password"]; 
        $this->Curp = $data["Curp"];  
        $this->Foto = $data["Foto"]; 
    }
    
    public function setId(string $Id):void{
        $this->Id = $Id;
    }

    public function setNombre(string $Nombre):void{
        $this->Nombre = $Nombre;
    }

    public function setPassword(string $Password):void{
        $this->Password = $Password;
    }

    public function setCurp(string $Curp):void{
        $this->Curp = $Curp;
    }

    public function setFoto(string $Foto):void{
        $this->Foto = $Foto;
    }
    
    public function register():stdClass{
        $select = DataBase::executeSelect("SELECT * FROM personas WHERE Curp = ?", [$this->Curp]);
        if (!$select->success) {
            $query = "INSERT INTO personas (Nombre, Password, Curp, Foto) VALUES (?,?,?,?)";
            $params = [ $this->Nombre, password_hash($this->Password, PASSWORD_DEFAULT), $this->Curp, $this->Foto];
            return DataBase::executeInsert($query, $params);
        }
        return Respuesta::response(false, "El CURP ya se encuentra registrado");
    }

    public function login (): stdClass{
        
        $data = DataBase::executeSelect("SELECT * FROM personas WHERE Correo = ?", [$this->Correo]);
        try { 
            if ( $data->success ) {
                if (password_verify($this->Password, $data->data[0]->passwd)) {
                    $response = Respuesta::response(true, "Login exitoso");
                    $response->Id = $data->data[0]->Id;
                    $response->Nombre = $data->data[0]->Nombre;
                    $response->perrosRescatados = $data->data[0]->perrosRescatados;
                    $response->nEncontrados = $data->data[0]->nEncontrados;
                    return $response;
                } else {
                    return $response = Respuesta::response(false, "Credenciales de acceso invalidas");
                }
            } else {
                return $response = Respuesta::response(false, "Credenciales de acceso invalidas");
            }
        } catch (Exception $e) {
            $response = new stdClass();
            return $response->error = $e->getMessage();
        }
    }

    public function verificar($codigo):stdClass{
        $data = DataBase::executeSelect("SELECT recovery FROM personas WHERE Correo = ?", [$this->Correo]);
        try {
            if ( $data -> success ) {
                $db = $data->data[0]->recovery;
                if ($db == $codigo)
                    return Respuesta::response(true, "OK");
                return Respuesta::response(false, "El codigo no coincide");
            }
            return Respuesta::response(false, "Usuario inexistente en el momento que se realizo la solicitud");
        } catch (Exception $e) {
            $response = new stdClass();
            return $response->error = $e->getMessage();
        }
    }
}