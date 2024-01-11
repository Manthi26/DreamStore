<?php

class Order {

    public $seq_id;
    public $username;
    public $product_id;
    public $product_name;
    public $product_image;
    public $quantity;
    public $status;
    public $shoulders;
    public $chest;
    public $sleeve;
    public $waist;
    public $center_back;

    public function getSeqId()
    {
        return $this->seq_id;
    }

    public function setSeqId($seq_id)
    {
        $this->seq_id = $seq_id;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function setUsername($username)
    {
        $this->username = $username;
    }

    public function getProductId()
    {
        return $this->product_id;
    }

    public function setProductId($product_id)
    {
        $this->product_id = $product_id;
    }

    public function getProductName()
    {
        return $this->product_name;
    }

    public function setProductName($product_name)
    {
        $this->product_name = $product_name;
    }

    public function getProductImage()
    {
        return $this->product_image;
    }

    public function setProductImage($product_image)
    {
        $this->product_image = $product_image;
    }

    public function getQuantity()
    {
        return $this->quantity;
    }

    public function setQuantity($quantity)
    {
        $this->quantity = $quantity;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function setStatus($status)
    {
        $this->status = $status;
    }

    public function getShoulders()
    {
        return $this->shoulders;
    }

    public function setShoulders($shoulders)
    {
        $this->shoulders = $shoulders;
    }

    public function getChest()
    {
        return $this->chest;
    }

    public function setChest($chest)
    {
        $this->chest = $chest;
    }

    public function getSleeve()
    {
        return $this->sleeve;
    }

    public function setSleeve($sleeve)
    {
        $this->sleeve = $sleeve;
    }

    public function getWaist()
    {
        return $this->waist;
    }

    public function setWaist($waist)
    {
        $this->waist = $waist;
    }

    public function getCenterBack()
    {
        return $this->center_back;
    }

    public function setCenterBack($center_back)
    {
        $this->center_back = $center_back;
    }

}
