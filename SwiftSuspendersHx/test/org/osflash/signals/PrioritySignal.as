package org.osflash.signals 
{
	class PrioritySignal extends Signal implements IPrioritySignal 
	{

		public function PrioritySignal(...valueClasses) 
		{
			// Cannot use super.apply(null, valueClasses), so allow the subclass to call super(valueClasses).
			valueClasses = (valueClasses.length == 1 && valueClasses[0] is Array<Dynamic>) ? valueClasses[0] : valueClasses;

			super(valueClasses);
		}

		/**
		 * @inheritDoc
		 * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
		 * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
		 */
		public function addWithPriority(listener:Function, priority:Int = 0):ISlot 
		{
			return registerListenerWithPriority(listener, false, priority);
		}

		/**
		 * @inheritDoc
		 * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot addOnce() then add() the same listener without removing the relationship first.
		 * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
		 */
		public function addOnceWithPriority(listener:Function, priority:Int = 0):ISlot 
		{
			return registerListenerWithPriority(listener, true, priority);
		}

		override private function registerListener(listener:Function, once:Bool = false):ISlot 
		{
			return registerListenerWithPriority(listener, once);
		}

		private function registerListenerWithPriority(listener:Function, once:Bool = false, priority:Int = 0):ISlot
		{
			if (registrationPossible(listener, once))
			{
				const slot:ISlot = new Slot(listener, this, once, priority);
				slots = slots.insertWithPriority(slot);
				return slot;
			}
			
			return slots.find(listener);
		}

	}
}
