package org.osflash.signals.events
{
	import org.osflash.signals.IPrioritySignal;

	/**
	 *
	 * @see org.osflash.signals.events.IEvent
	 * Documentation for the event interface being maintained in IEvent to avoid duplication for now.
	 */
	class GenericEvent implements IEvent
	{
		private var _bubbles:Bool;
		private var _target:Object;
		private var _currentTarget:Object;
		private var _signal:IPrioritySignal;
		
		public function GenericEvent(bubbles:Bool = false)
		{
			_bubbles = bubbles;
		}
		
		/** @inheritDoc */
		public function get signal():IPrioritySignal { return _signal; }
		public function set signal(value:IPrioritySignal):Void { _signal = value; }
		
		/** @inheritDoc */
		public function get target():Object { return _target; }
		public function set target(value:Object):Void { _target = value; }
		
		/** @inheritDoc */
		public function get currentTarget():Object { return _currentTarget; }
		public function set currentTarget(value:Object):Void { _currentTarget = value; }
		
		/** @inheritDoc */
		public function get bubbles():Bool { return _bubbles; }
		public function set bubbles(value:Bool):Void	{ _bubbles = value;	}
		
		/** @inheritDoc */
		public function clone():IEvent
		{
			return new GenericEvent(_bubbles);
		}
	}
}
