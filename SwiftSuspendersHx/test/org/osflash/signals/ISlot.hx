package org.osflash.signals
{
	/**
	 * The ISlot interface defines the basic properties of a
	 * listener associated with a Signal.
	 *
	 * @author Joa Ebert
	 * @author Robert Penner
	 */
	public interface ISlot
	{
		/**
		 * The listener associated with this slot.
		 */
		function get listener():Function;
		function set listener(value:Function):Void;
		
		/**
		 * Allows the ISlot to inject parameters when dispatching. The params will be at 
		 * the tail of the arguments and the ISignal arguments will be at the head.
		 * 
		 * var signal:ISignal = new Signal(String);
		 * signal.add(handler).params = [42];
		 * signal.dispatch('The Answer');
		 * function handler(name:String, num:Int):Void{}
		 */
		function get params():Array<Dynamic>;
		function set params(value:Array<Dynamic>):Void;

		/**
		 * Whether this slot is automatically removed after it has been used once.
		 */
		function get once():Bool;

		/**
		 * The priority of this slot should be given in the execution order.
		 * An IPrioritySignal will call higher numbers before lower ones.
		 * Defaults to 0.
		 */
		function get priority():Int;
		
		/**
		 * Whether the listener is called on execution. Defaults to true.
		 */
		function get enabled():Bool;
		function set enabled(value:Bool):Void;
		
		/**
		 * Executes a listener without arguments.
		 * Existing <code>params</code> are appended before the listener is called.
		 */
		function execute0():Void;		

		/**
		 * Dispatches one argument to a listener.
		 * Existing <code>params</code> are appended before the listener is called.
		 * @param value The argument for the listener.
		 */
		function execute1(value:Object):Void;		

		/**
		 * Executes a listener of arity <code>n</code> where <code>n</code> is
		 * <code>valueObjects.length</code>.
		 * Existing <code>params</code> are appended before the listener is called.
		 * @param valueObjects The array of arguments to be applied to the listener.
		 */
		function execute(valueObjects:Array<Dynamic>):Void;
		
		/**
		 * Removes the slot from its signal.
		 */
		function remove():Void;
	}
}
