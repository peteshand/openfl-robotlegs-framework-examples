package com.imag.robotlegsHaxe.services;

/**
 * ...
 * @author P.J.Shand
 */
@:rtti
class ExampleService
{
	public var id:String;
	
	public function new() 
	{
		id = "id" + Math.random();
	}
	
}