package org.osflash.signals.natives.sets {
	import org.osflash.signals.natives.NativeSignal;

	import flash.events.Event;
	import flash.net.FileReference;

	/**
	 * @author Jon Adams
	 */
	class FileReferenceListSignalSet extends EventDispatcherSignalSet {

		public function FileReferenceListSignalSet(target:FileReference) {
			super(target);
		}

		public function get cancel():NativeSignal {
			return getNativeSignal(Event.CANCEL);
		}

		public function get select():NativeSignal {
			return getNativeSignal(Event.SELECT);
		}
	}
}
