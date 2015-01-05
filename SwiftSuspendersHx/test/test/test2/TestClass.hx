package test.test2;

/**
 * ...
 * @author P.J.Shand
 */

class TestClass implements TestInterface
{
	public var testVar1:String = "123";
	public var testVar2:String = "abc";
	
	public var value1(get_value1, null):Int = 5;
	public function get_value1():Int
	{
		return value1;
	}
	
	public function new() 
	{
		
	}
	
	public function testFun():Void 
	{
		
	}
	
}