package org.osflash.signals 
{
    /**
     * The Slot class represents a signal slot.
     *
     * @author Robert Penner
	 * @author Joa Ebert
     */
	class Slot implements ISlot
	{
		private var _signal:IOnceSignal;
		private var _enabled:Bool = true;
		private var _listener:Function;
		private var _once:Bool = false;
		private var _priority:Int = 0;
		private var _params:Array<Dynamic>;
		
		/**
		 * Creates and returns a new Slot object.
		 *
		 * @param listener The listener associated with the slot.
		 * @param signal The signal associated with the slot.
		 * @param once Whether or not the listener should be executed only once.
		 * @param priority The priority of the slot.
		 *
		 * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
		 * @throws Error <code>Error</code>: Internal signal reference has not been set yet.
		 */
		public function Slot(listener:Function, signal:IOnceSignal, once:Bool = false, priority:Int = 0)
		{
			_listener = listener;
			_once = once;
			_signal = signal;
			_priority = priority;
							
			verifyListener(listener);
		}
		
		/**
		 * @inheritDoc
		 */
		public function execute0():Void
		{
			if (!_enabled) return;
			if (_once) remove();
			if (_params && _params.length)
			{
				_listener.apply(null, _params);
				return;
			}
			_listener();
		}		
		
		/**
		 * @inheritDoc
		 */
		public function execute1(value:Object):Void
		{
			if (!_enabled) return;
			if (_once) remove();
			if (_params && _params.length)
			{
				_listener.apply(null, [value].concat(_params));
				return;
			}
			_listener(value);
		}		

		/**
		 * @inheritDoc
		 */
		public function execute(valueObjects:Array<Dynamic>):Void
		{
			if (!_enabled) return;
			if (_once) remove();
			
			// If we have parameters, add them to the valueObject
			// Note: This could be expensive if we're after the fastest dispatch possible.
			if (_params && _params.length)
			{
				valueObjects = valueObjects.concat(_params);
			}
			
			// NOTE: simple ifs are faster than switch: http://jacksondunstan.com/articles/1007
			const numValueObjects:Int = valueObjects.length;
			if (numValueObjects == 0)
			{
				_listener();
			}
			else if (numValueObjects == 1)
			{
				_listener(valueObjects[0]);
			}
			else if (numValueObjects == 2)
			{
				_listener(valueObjects[0], valueObjects[1]);
			}
			else if (numValueObjects == 3)
			{
				_listener(valueObjects[0], valueObjects[1], valueObjects[2]);
			}
			else
			{
				_listener.apply(null, valueObjects);
			}
		}

		/**
		 * @inheritDoc
		 * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>. Did you want to set enabled to false instead?
		 * @throws Error <code>Error</code>: Internal signal reference has not been set yet.
		 */
		public function get listener():Function
		{
			return _listener;
		}

		public function set listener(value:Function):Void
		{
			if (null == value) throw new ArgumentError(
					'Given listener is null.\nDid you want to set enabled to false instead?');
			
			verifyListener(value);
			_listener = value;
		}

		/**
		 * @inheritDoc
		 */
		public function get once():Bool { return _once; }

		/**
		 * @inheritDoc
		 */
		public function get priority():Int { return _priority; }

		/**
		 * Creates and returns the string representation of the current object.
		 *
		 * @return The string representation of the current object.
		 */
		public function toString():String
		{
			return "[Slot listener: "+_listener+", once: "+_once
											+", priority: "+_priority+", enabled: "+_enabled+"]";
		}

		/**
		 * @inheritDoc
		 */
		public function get enabled():Bool { return _enabled; }

		public function set enabled(value:Bool):Void	{ _enabled = value; }
		
		/**
		 * @inheritDoc
		 */		
		public function get params():Array<Dynamic> { return _params; }
		
		public function set params(value:Array<Dynamic>):Void { _params = value; }
		
		/**
		 * @inheritDoc
		 */
		public function remove():Void
		{
			_signal.remove(_listener);
		}

		private function verifyListener(listener:Function): void
		{
			if (null == listener)
			{
				throw new ArgumentError('Given listener is null.');
			}

			if (null == _signal)
			{
				throw new Error('Internal signal reference has not been set yet.');
			}
			
		}
	}
}